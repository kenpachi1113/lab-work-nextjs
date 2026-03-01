interface Mediator {
  Notify(sender: any, event: string): void;
  RegisterAircraft(aircraft: Aircraft): void;
  RegisterRunway(runway: Runway): void;
  GetAvailableRunway(): Runway | null;
}

class CommandCentre implements Mediator {
  private runways: Runway[] = [];
  private aircrafts: Aircraft[] = [];

  RegisterAircraft(aircraft: Aircraft): void {
    this.aircrafts.push(aircraft);
    aircraft.SetMediator(this);
  }

  RegisterRunway(runway: Runway): void {
    this.runways.push(runway);
    runway.SetMediator(this);
  }

  GetAvailableRunway(): Runway | null {
    for (const runway of this.runways) {
      if (!runway.IsBusy()) {
        return runway;
      }
    }
    return null;
  }

  Notify(sender: any, event: string): void {
    if (event === 'LAND_REQUEST') {
      const runway = this.GetAvailableRunway();
      if (runway) {
        runway.Occupy(sender);
      } else {
        console.log(`Aircraft ${sender.Name} waiting: no available runway.`);
      }
    } else if (event === 'TAKEOFF_REQUEST') {
      sender.ReleaseRunway();
    }
  }
}

class Aircraft {
  public Name: string;
  private mediator: Mediator | null = null;
  private currentRunway: Runway | null = null;

  constructor(name: string) {
    this.Name = name;
  }

  SetMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  RequestLand(): void {
    console.log(`Aircraft ${this.Name} requesting landing...`);
    if (this.mediator) {
      this.mediator.Notify(this, 'LAND_REQUEST');
    }
  }

  RequestTakeOff(): void {
    console.log(`Aircraft ${this.Name} requesting takeoff...`);
    if (this.mediator) {
      this.mediator.Notify(this, 'TAKEOFF_REQUEST');
    }
  }

  SetRunway(runway: Runway | null): void {
    this.currentRunway = runway;
  }

  ReleaseRunway(): void {
    if (this.currentRunway) {
      this.currentRunway.Release();
      this.currentRunway = null;
    }
  }
}

class Runway {
  public Id: string;
  private mediator: Mediator | null = null;
  private busy: boolean = false;
  private aircraft: Aircraft | null = null;

  constructor() {
    this.Id = Math.random().toString(36).substring(7);
  }

  SetMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  IsBusy(): boolean {
    return this.busy;
  }

  Occupy(aircraft: Aircraft): void {
    this.busy = true;
    this.aircraft = aircraft;
    aircraft.SetRunway(this);
    console.log(`Runway ${this.Id} occupied by ${aircraft.Name}.`);
    this.HighLightRed();
  }

  Release(): void {
    this.busy = false;
    console.log(`Runway ${this.Id} released.`);
    this.HighLightGreen();
  }

  HighLightRed(): void {
    console.log(`Runway ${this.Id} status: BUSY (RED)`);
  }

  HighLightGreen(): void {
    console.log(`Runway ${this.Id} status: FREE (GREEN)`);
  }
}

export function runMediatorTask() {
  console.log('\n--- ЗАВДАННЯ 2: ПОСЕРЕДНИК ---');

  const tower = new CommandCentre();
  const runway1 = new Runway();
  const runway2 = new Runway();
  const plane1 = new Aircraft('Flight-101');
  const plane2 = new Aircraft('Flight-202');

  tower.RegisterRunway(runway1);
  tower.RegisterRunway(runway2);
  tower.RegisterAircraft(plane1);
  tower.RegisterAircraft(plane2);

  plane1.RequestLand();
  plane2.RequestLand();
  plane1.RequestTakeOff();
  plane2.RequestLand();
}