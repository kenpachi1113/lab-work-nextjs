// lib/patterns/task2.ts

export interface Device {
  brand: string;
  type: string;
  specs: string;
}

export class Laptop implements Device {
  constructor(public brand: string) {}
  type = 'Laptop';
  specs = 'High performance CPU';
}

export class Smartphone implements Device {
  constructor(public brand: string) {}
  type = 'Smartphone';
  specs = '5G Support';
}

export interface TechFactory {
  createLaptop(): Device;
  createSmartphone(): Device;
}

export class IProneFactory implements TechFactory {
  createLaptop(): Device { return new Laptop('IProne'); }
  createSmartphone(): Device { return new Smartphone('IProne'); }
}

export class KiaomiFactory implements TechFactory {
  createLaptop(): Device { return new Laptop('Kiaomi'); }
  createSmartphone(): Device { return new Smartphone('Kiaomi'); }
}

export class BalaxyFactory implements TechFactory {
  createLaptop(): Device { return new Laptop('Balaxy'); }
  createSmartphone(): Device { return new Smartphone('Balaxy'); }
}