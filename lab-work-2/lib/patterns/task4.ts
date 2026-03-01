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
    return VirusCloner.clone(this);
  }
}
export class VirusCloner {
  static clone(virus: Virus): Virus {
    const clonedChildren = virus.children.map(child => this.clone(child));
    return new Virus(
      virus.weight,
      virus.age,
      virus.name,
      virus.type,
      clonedChildren
    );
  }
}