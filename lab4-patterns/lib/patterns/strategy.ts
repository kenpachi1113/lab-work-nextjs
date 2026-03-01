import { LightElementNode } from './composite';

interface ImageLoaderStrategy {
  Load(src: string): string;
}

class FileImageLoader implements ImageLoaderStrategy {
  Load(src: string): string {
    return `Loading image from file system: ${src}`;
  }
}

class NetworkImageLoader implements ImageLoaderStrategy {
  Load(src: string): string {
    return `Loading image from network: ${src}`;
  }
}

export class ImageNode extends LightElementNode {
  private strategy: ImageLoaderStrategy;
  private src: string;

  constructor(src: string, strategy: ImageLoaderStrategy) {
    super('img', 'inline', 'single', []);
    this.src = src;
    this.strategy = strategy;
  }

  Load(): string {
    return this.strategy.Load(this.src);
  }

  OuterHTML(): string {
    return `<img src="${this.src}" />`;
  }
}

export function runStrategyTask() {
  console.log('\n--- ЗАВДАННЯ 4: СТРАТЕГІЯ ---');

  const localImg = new ImageNode('/images/logo.png', new FileImageLoader());
  const remoteImg = new ImageNode('https://example.com/image.jpg', new NetworkImageLoader());

  console.log(localImg.Load());
  console.log(remoteImg.Load());

  console.log(`Local HTML: ${localImg.OuterHTML()}`);
  console.log(`Remote HTML: ${remoteImg.OuterHTML()}`);
}