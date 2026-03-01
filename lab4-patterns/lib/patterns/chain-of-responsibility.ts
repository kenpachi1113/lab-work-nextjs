interface SupportHandler {
  SetNext(handler: SupportHandler): SupportHandler;
  HandleRequest(level: number): void;
}

abstract class BaseHandler implements SupportHandler {
  private nextHandler: SupportHandler | null = null;

  SetNext(handler: SupportHandler): SupportHandler {
    this.nextHandler = handler;
    return handler;
  }

  HandleRequest(level: number): void {
    if (this.nextHandler) {
      this.nextHandler.HandleRequest(level);
    } else {
      console.log('Menu reset. Please select again.');
    }
  }

  protected abstract CheckLevel(level: number): boolean;
  protected abstract ProcessRequest(): void;
}

class BillingHandler extends BaseHandler {
  protected CheckLevel(level: number): boolean {
    return level === 1;
  }

  protected ProcessRequest(): void {
    console.log('Connecting to Billing Support...');
  }

  HandleRequest(level: number): void {
    if (this.CheckLevel(level)) {
      this.ProcessRequest();
    } else {
      super.HandleRequest(level);
    }
  }
}

class TechnicalHandler extends BaseHandler {
  protected CheckLevel(level: number): boolean {
    return level === 2;
  }

  protected ProcessRequest(): void {
    console.log('Connecting to Technical Support...');
  }

  HandleRequest(level: number): void {
    if (this.CheckLevel(level)) {
      this.ProcessRequest();
    } else {
      super.HandleRequest(level);
    }
  }
}

class AccountHandler extends BaseHandler {
  protected CheckLevel(level: number): boolean {
    return level === 3;
  }

  protected ProcessRequest(): void {
    console.log('Connecting to Account Support...');
  }

  HandleRequest(level: number): void {
    if (this.CheckLevel(level)) {
      this.ProcessRequest();
    } else {
      super.HandleRequest(level);
    }
  }
}

class GeneralHandler extends BaseHandler {
  protected CheckLevel(level: number): boolean {
    return level === 4;
  }

  protected ProcessRequest(): void {
    console.log('Connecting to General Operator...');
  }

  HandleRequest(level: number): void {
    if (this.CheckLevel(level)) {
      this.ProcessRequest();
    } else {
      super.HandleRequest(level);
    }
  }
}

export function runChainOfResponsibilityTask() {
  console.log('\n--- ЗАВДАННЯ 1: ЛАНЦЮЖОК ВІДПОВІДАЛЬНОСТЕЙ ---');
  
  const billing = new BillingHandler();
  const technical = new TechnicalHandler();
  const account = new AccountHandler();
  const general = new GeneralHandler();

  billing.SetNext(technical).SetNext(account).SetNext(general);

  console.log('Select support level (1-4):');
  console.log('1. Billing, 2. Technical, 3. Account, 4. General');
  
  billing.HandleRequest(2);
  billing.HandleRequest(5);
}