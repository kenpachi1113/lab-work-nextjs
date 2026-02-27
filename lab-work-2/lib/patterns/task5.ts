// lib/patterns/task5.ts

export interface Character {
  height: string;
  build: string;
  hairColor: string;
  eyeColor: string;
  clothes: string;
  inventory: string[];
  alignment: 'Good' | 'Evil';
  deeds: string[];
}

export interface Builder {
  setHeight(h: string): this;
  setBuild(b: string): this;
  setHairColor(c: string): this;
  setEyeColor(c: string): this;
  setClothes(c: string): this;
  addItem(item: string): this;
  getResult(): Character;
}

export class HeroBuilder implements Builder {
  private character: Partial<Character> = { alignment: 'Good', deeds: [] };

  setHeight(h: string): this { this.character.height = h; return this; }
  setBuild(b: string): this { this.character.build = b; return this; }
  setHairColor(c: string): this { this.character.hairColor = c; return this; }
  setEyeColor(c: string): this { this.character.eyeColor = c; return this; }
  setClothes(c: string): this { this.character.clothes = c; return this; }
  addItem(item: string): this { 
    if(!this.character.inventory) this.character.inventory = [];
    this.character.inventory.push(item); 
    return this; 
  }
  
  doGoodDeed(deed: string): this {
    this.character.deeds?.push(deed);
    return this;
  }

  getResult(): Character {
    return this.character as Character;
  }
}

export class EnemyBuilder implements Builder {
  private character: Partial<Character> = { alignment: 'Evil', deeds: [] };

  setHeight(h: string): this { this.character.height = h; return this; }
  setBuild(b: string): this { this.character.build = b; return this; }
  setHairColor(c: string): this { this.character.hairColor = c; return this; }
  setEyeColor(c: string): this { this.character.eyeColor = c; return this; }
  setClothes(c: string): this { this.character.clothes = c; return this; }
  addItem(item: string): this { 
    if(!this.character.inventory) this.character.inventory = [];
    this.character.inventory.push(item); 
    return this; 
  }

  doEvilDeed(deed: string): this {
    this.character.deeds?.push(deed);
    return this;
  }

  getResult(): Character {
    return this.character as Character;
  }
}

export class Director {
  constructHero(builder: HeroBuilder): Character {
    return builder
      .setHeight('180cm')
      .setBuild('Athletic')
      .setHairColor('Blond')
      .setEyeColor('Blue')
      .setClothes('Armor')
      .addItem('Sword')
      .addItem('Shield')
      .doGoodDeed('Saved the village')
      .getResult();
  }

  constructEnemy(builder: EnemyBuilder): Character {
    return builder
      .setHeight('200cm')
      .setBuild('Huge')
      .setHairColor('Black')
      .setEyeColor('Red')
      .setClothes('Dark Robes')
      .addItem('Dark Staff')
      .doEvilDeed('Destroyed the kingdom')
      .getResult();
  }
}