import fs from 'fs';

interface TextReader {
  Read(filename: string): string[][];
}

class SmartTextReader implements TextReader {
  Read(filename: string): string[][] {
    const content = fs.readFileSync(filename, 'utf-8');
    return content.split('\n').map((line) => line.split(''));
  }
}

class SmartTextChecker implements TextReader {
  private reader: SmartTextReader;
  constructor() {
    this.reader = new SmartTextReader();
  }

  Read(filename: string): string[][] {
    console.log(`[Proxy] Opening ${filename}...`);
    try {
      const data = this.reader.Read(filename);
      const lines = data.length;
      const chars = data.reduce((acc, row) => acc + row.length, 0);
      console.log(`[Proxy] Success. Lines: ${lines}, Chars: ${chars}`);
      console.log(`[Proxy] Closing ${filename}...`);
      return data;
    } catch (e) {
      console.log(`[Proxy] Error reading file: ${e}`);
      return [];
    }
  }
}

class SmartTextReaderLocker implements TextReader {
  private reader: SmartTextReader;
  private pattern: RegExp;

  constructor(pattern: string) {
    this.reader = new SmartTextReader();
    this.pattern = new RegExp(pattern);
  }

  Read(filename: string): string[][] {
    if (this.pattern.test(filename)) {
      console.log('Access denied!');
      return [];
    }
    return this.reader.Read(filename);
  }
}

export function runProxyTask() {
  console.log('\n--- ЗАВДАННЯ 4: ПРОКСІ ---');
  const checker = new SmartTextChecker();
  checker.Read('test.txt');

  const locker = new SmartTextReaderLocker('secret.*');
  locker.Read('secret_data.txt');
  locker.Read('public.txt');
}