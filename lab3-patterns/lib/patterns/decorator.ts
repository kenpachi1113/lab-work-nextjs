interface Hero {
  GetName(): string;
  GetStats(): string;
  GetDamage(): number;
}

class Warrior implements Hero {
  GetName(): string { return 'Warrior'; }
  GetStats(): string { return 'HP: 100, Mana: 0'; }
  GetDamage(): number { return 10; }
}

class Mage implements Hero {
  GetName(): string { return 'Mage'; }
  GetStats(): string { return 'HP: 50, Mana: 100'; }
  GetDamage(): number { return 20; }
}

class Paladin implements Hero {
  GetName(): string { return 'Paladin'; }
  GetStats(): string { return 'HP: 80, Mana: 50'; }
  GetDamage(): number { return 15; }
}

abstract class HeroDecorator implements Hero {
  protected hero: Hero;
  constructor(hero: Hero) {
    this.hero = hero;
  }
  GetName(): string {
    return this.hero.GetName();
  }
  GetStats(): string {
    return this.hero.GetStats();
  }
  GetDamage(): number {
    return this.hero.GetDamage();
  }
}

class WeaponDecorator extends HeroDecorator {
  GetDamage(): number {
    return this.hero.GetDamage() + 5;
  }
  GetStats(): string {
    return this.hero.GetStats() + ', Item: Sword';
  }
}

class ArmorDecorator extends HeroDecorator {
  GetStats(): string {
    return this.hero.GetStats() + ', Item: Armor';
  }
}

class ArtifactDecorator extends HeroDecorator {
  GetDamage(): number {
    return this.hero.GetDamage() + 2;
  }
  GetStats(): string {
    return this.hero.GetStats() + ', Item: Ring';
  }
}

export function runDecoratorTask() {
  console.log('\n--- ЗАВДАННЯ 2: ДЕКОРАТОР ---');
  let hero: Hero = new Warrior();
  console.log(`Base: ${hero.GetName()}, Dmg: ${hero.GetDamage()}`);

  hero = new WeaponDecorator(hero);
  hero = new ArmorDecorator(hero);
  hero = new ArtifactDecorator(hero);
  hero = new WeaponDecorator(hero);

  console.log(`Equipped: ${hero.GetName()}, Stats: ${hero.GetStats()}, Dmg: ${hero.GetDamage()}`);
}