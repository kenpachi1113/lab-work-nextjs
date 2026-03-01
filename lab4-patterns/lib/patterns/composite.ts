export abstract class LightNode {
  abstract OuterHTML(): string;
  abstract InnerHTML(): string;
}

export class LightTextNode extends LightNode {
  private text: string;
  constructor(text: string) {
    super();
    this.text = text;
  }
  OuterHTML(): string {
    return this.text;
  }
  InnerHTML(): string {
    return this.text;
  }
}

export class LightElementNode extends LightNode {
  private tag: string;
  private displayType: 'block' | 'inline';
  private closingType: 'single' | 'pair';
  private classes: string[];
  private children: LightNode[];

  constructor(
    tag: string,
    displayType: 'block' | 'inline',
    closingType: 'single' | 'pair',
    classes: string[] = []
  ) {
    super();
    this.tag = tag;
    this.displayType = displayType;
    this.closingType = closingType;
    this.classes = classes;
    this.children = [];
  }

  Append(child: LightNode): void {
    this.children.push(child);
  }

  InnerHTML(): string {
    return this.children.map((c) => c.OuterHTML()).join('');
  }

  OuterHTML(): string {
    const classStr = this.classes.length ? ` class="${this.classes.join(' ')}"` : '';
    const inner = this.InnerHTML();

    if (this.closingType === 'single') {
      return `<${this.tag}${classStr} />`;
    }
    return `<${this.tag}${classStr}>${inner}</${this.tag}>`;
  }
}

export function runCompositeTask() {
  console.log('\n--- ЗАВДАННЯ 5: КОМПОНУВАЛЬНИК ---');
  const table = new LightElementNode('table', 'block', 'pair', ['styled-table']);
  const row = new LightElementNode('tr', 'block', 'pair');
  const cell = new LightElementNode('td', 'inline', 'pair');

  cell.Append(new LightTextNode('Data Cell'));
  row.Append(cell);
  table.Append(row);

  console.log(table.OuterHTML());
}