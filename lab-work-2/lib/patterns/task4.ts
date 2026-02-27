// lib/patterns/task4.ts

export interface VirusPrototype {
  clone(): Virus;
}

export class Virus implements VirusPrototype {
  constructor(
    public weight: number,
    public age: number,
    public name: string,
    public type: string,
    public children: Virus[] = []
  ) {}

  clone(): Virus {
    // Глибоке клонування дітей
    const clonedChildren = this.children.map(child => child.clone());
    return new Virus(
      this.weight,
      this.age,
      this.name,
      this.type,
      clonedChildren
    );
  }
}