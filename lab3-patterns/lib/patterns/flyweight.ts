import { LightElementNode, LightTextNode } from './composite';

class FlyweightFactory {
  private static flyweights: Record<string, any> = {};

  static GetNodeConfig(tag: string, type: string): any {
    const key = `${tag}-${type}`;
    if (!this.flyweights[key]) {
      this.flyweights[key] = { tag, type };
    }
    return this.flyweights[key];
  }

  static GetCount(): number {
    return Object.keys(this.flyweights).length;
  }
}

export function runFlyweightTask() {
  console.log('\n--- ЗАВДАННЯ 6: ЛЕГКОВАГОВИК ---');

  const bookLines = [
    'Chapter 1',
    'Intro',
    ' Quote',
    'This is a long paragraph text that exceeds twenty characters limit.',
    'Short',
    ' End ',
  ];

  const beforeMem = process.memoryUsage().heapUsed;

  const root = new LightElementNode('div', 'block', 'pair');

  bookLines.forEach((line, index) => {
    let tag = 'p';
    if (index === 0) tag = 'h1';
    else if (line.length < 20) tag = 'h2';
    else if (line.startsWith(' ')) tag = 'blockquote';

    FlyweightFactory.GetNodeConfig(tag, 'block');

    const el = new LightElementNode(tag, 'block', 'pair');
    el.Append(new LightTextNode(line.trim()));
    root.Append(el);
  });

  const afterMem = process.memoryUsage().heapUsed;

  console.log(`HTML Structure: ${root.OuterHTML()}`);
  console.log(`Memory Used: ${(afterMem - beforeMem) / 1024 / 1024} MB`);
  console.log(`Flyweight configs created: ${FlyweightFactory.GetCount()}`);
}