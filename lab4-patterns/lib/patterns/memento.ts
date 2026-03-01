class TextDocument {
  private content: string;

  constructor(content: string = '') {
    this.content = content;
  }

  GetContent(): string {
    return this.content;
  }

  SetContent(content: string): void {
    this.content = content;
  }

  CreateMemento(): TextMemento {
    return new TextMemento(this.content);
  }

  Restore(memento: TextMemento): void {
    this.content = memento.GetContent();
  }
}

class TextMemento {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  GetContent(): string {
    return this.content;
  }
}

class TextEditor {
  private document: TextDocument;
  private history: TextMemento[] = [];
  private currentIndex: number = -1;

  constructor() {
    this.document = new TextDocument();
  }

  Type(text: string): void {
    this.SaveState();
    const current = this.document.GetContent();
    this.document.SetContent(current + text);
    console.log(`Typed: "${text}"`);
  }

  SaveState(): void {
    const memento = this.document.CreateMemento();
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(memento);
    this.currentIndex++;
  }

  Undo(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.document.Restore(this.history[this.currentIndex]);
      console.log(`Undo performed. Content: "${this.document.GetContent()}"`);
    } else {
      console.log('Nothing to undo.');
    }
  }

  GetContent(): string {
    return this.document.GetContent();
  }
}

export function runMementoTask() {
  console.log('\n--- ЗАВДАННЯ 5: МЕМЕНТО ---');

  const editor = new TextEditor();

  editor.Type('Hello ');
  editor.Type('World');
  editor.Type('!');

  console.log(`Current: "${editor.GetContent()}"`);

  editor.Undo();
  editor.Undo();

  console.log(`After Undo: "${editor.GetContent()}"`);
}