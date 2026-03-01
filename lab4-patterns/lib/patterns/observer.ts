import { LightNode, LightElementNode, LightTextNode } from './composite';

type EventType = 'click' | 'mouseover' | 'mouseout' | 'submit';

interface EventListener {
  EventType: EventType;
  Callback: (data?: any) => void;
}

export class ObservableElementNode extends LightElementNode {
  private listeners: Map<EventType, EventListener[]> = new Map();

  AddEventListener(event: EventType, callback: (data?: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push({ EventType: event, Callback: callback });
  }

  TriggerEvent(event: EventType, data?: any): void {
    const list = this.listeners.get(event);
    if (list) {
      console.log(`Event '${event}' triggered on ${this.tag}`);
      list.forEach(listener => listener.Callback(data));
    }
  }
}

export function runObserverTask() {
  console.log('\n--- ЗАВДАННЯ 3: СПОСТЕРІГАЧ ---');

  const button = new ObservableElementNode('button', 'inline', 'pair', ['btn']);
  const text = new LightTextNode('Click Me');
  button.Append(text);

  button.AddEventListener('click', () => {
    console.log('Button was clicked!');
  });

  button.AddEventListener('mouseover', () => {
    console.log('Mouse hovered over button!');
  });

  button.TriggerEvent('click');
  button.TriggerEvent('mouseover');

  console.log(`HTML: ${button.OuterHTML()}`);
}