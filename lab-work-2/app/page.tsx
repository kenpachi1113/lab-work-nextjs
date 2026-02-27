// app/page.tsx
'use client';

import { useState } from 'react';
import { WebSite, MobileApp } from '@/lib/patterns/task1';
import { IProneFactory, KiaomiFactory } from '@/lib/patterns/task2';
import { Authenticator } from '@/lib/patterns/task3';
import { Virus } from '@/lib/patterns/task4';
import { HeroBuilder, EnemyBuilder, Director } from '@/lib/patterns/task5';

export default function Home() {
  const [output, setOutput] = useState<string>('');

  const runAllTasks = () => {
    const logs: string[] = [];

    // Task 1
    logs.push('=== Task 1: Factory Method ===');
    const web = new WebSite();
    const sub1 = web.createSubscription('premium');
    logs.push(`WebSite: ${sub1.type}, Price: ${sub1.monthlyPrice}`);
    
    const app = new MobileApp();
    const sub2 = app.createSubscription('domestic');
    logs.push(`MobileApp: ${sub2.type}, Price: ${sub2.monthlyPrice}`);

    // Task 2
    logs.push('\n=== Task 2: Abstract Factory ===');
    const iprone = new IProneFactory();
    logs.push(`IProne Laptop: ${iprone.createLaptop().brand}`);
    const kiaomi = new KiaomiFactory();
    logs.push(`Kiaomi Phone: ${kiaomi.createSmartphone().brand}`);

    // Task 3
    logs.push('\n=== Task 3: Singleton ===');
    const auth1 = Authenticator.getInstance();
    const auth2 = Authenticator.getInstance();
    auth1.setToken('TOKEN_123');
    logs.push(`Token: ${auth1.getToken()}`);
    logs.push(`Same instance: ${auth1 === auth2}`);

    // Task 4
    logs.push('\n=== Task 4: Prototype ===');
    const grandChild = new Virus(5, 0, 'GrandChild', 'Flu-Strain');
    const child = new Virus(10, 1, 'Child', 'Flu', [grandChild]);
    const parent = new Virus(50, 5, 'Parent', 'Corona', [child]);
    
    const clone = parent.clone();
    
    logs.push(`Parent: ${parent.name}, Children: ${parent.children.length}`);
    logs.push(`Child: ${parent.children[0].name}, Grandchildren: ${parent.children[0].children.length}`);
    logs.push(`Clone: ${clone.name}, Children: ${clone.children.length}`);
    logs.push(`Clone Child: ${clone.children[0].name}, Grandchildren: ${clone.children[0].children.length}`);
    logs.push(`Different objects: ${parent !== clone}`);
    logs.push(`Children also cloned: ${parent.children[0] !== clone.children[0]}`);

    // Task 5
    logs.push('\n=== Task 5: Builder ===');
    const director = new Director();
    const hero = director.constructHero(new HeroBuilder());
    const enemy = director.constructEnemy(new EnemyBuilder());
    logs.push(`Hero: ${hero.height}, ${hero.alignment}`);
    logs.push(`Enemy: ${enemy.height}, ${enemy.alignment}`);

    setOutput(logs.join('\n'));
  };

  return (
    <div>
      <button onClick={runAllTasks}>Run All Patterns</button>
      <pre>{output}</pre>
    </div>
  );
}