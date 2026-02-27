// lib/patterns/task3.ts

export class Authenticator {
  private static instance: Authenticator;
  private token: string = 'initial-token';

  private constructor() {}

  public static getInstance(): Authenticator {
    if (!Authenticator.instance) {
      Authenticator.instance = new Authenticator();
    }
    return Authenticator.instance;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }
}