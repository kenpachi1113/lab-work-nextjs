import fs from 'fs';

interface ILogger {
  Log(message: string): void;
  Error(message: string): void;
  Warn(message: string): void;
}

class Logger implements ILogger {
  Log(message: string): void {
    console.log('\x1b[32m%s\x1b[0m', `LOG: ${message}`);
  }
  Error(message: string): void {
    console.log('\x1b[31m%s\x1b[0m', `ERROR: ${message}`);
  }
  Warn(message: string): void {
    console.log('\x1b[33m%s\x1b[0m', `WARN: ${message}`);
  }
}

class FileWriter {
  Write(filename: string, content: string): void {
    fs.appendFileSync(filename, content);
  }
  WriteLine(filename: string, content: string): void {
    fs.appendFileSync(filename, content + '\n');
  }
}

class FileLoggerAdapter implements ILogger {
  private fileWriter: FileWriter;
  private filename: string;

  constructor(filename: string) {
    this.fileWriter = new FileWriter();
    this.filename = filename;
  }

  Log(message: string): void {
    this.fileWriter.WriteLine(this.filename, `[LOG] ${message}`);
  }
  Error(message: string): void {
    this.fileWriter.WriteLine(this.filename, `[ERROR] ${message}`);
  }
  Warn(message: string): void {
    this.fileWriter.WriteLine(this.filename, `[WARN] ${message}`);
  }
}

export function runAdapterTask() {
  console.log('\n--- ЗАВДАННЯ 1: АДАПТЕР ---');
  const logger = new Logger();
  logger.Log('Повідомлення в консоль');
  logger.Error('Помилка в консоль');
  logger.Warn('Попередження в консоль');

  const fileLogger = new FileLoggerAdapter('lab3_output.txt');
  fileLogger.Log('Запис у файл');
  fileLogger.Error('Помилка у файл');
  console.log('Файл lab3_output.txt оновлено.');
}