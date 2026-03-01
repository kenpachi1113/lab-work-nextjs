interface Renderer {
  RenderCircle(radius: number): void;
  RenderSquare(side: number): void;
  RenderTriangle(base: number): void;
}

class VectorRenderer implements Renderer {
  RenderCircle(radius: number): void {
    console.log(`Drawing Circle as vectors (r=${radius})`);
  }
  RenderSquare(side: number): void {
    console.log(`Drawing Square as vectors (s=${side})`);
  }
  RenderTriangle(base: number): void {
    console.log(`Drawing Triangle as vectors (b=${base})`);
  }
}

class RasterRenderer implements Renderer {
  RenderCircle(radius: number): void {
    console.log(`Drawing Circle as pixels (r=${radius})`);
  }
  RenderSquare(side: number): void {
    console.log(`Drawing Square as pixels (s=${side})`);
  }
  RenderTriangle(base: number): void {
    console.log(`Drawing Triangle as pixels (b=${base})`);
  }
}

abstract class Shape {
  protected renderer: Renderer;
  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }
  abstract Draw(): void;
}

class Circle extends Shape {
  private radius: number;
  constructor(renderer: Renderer, radius: number) {
    super(renderer);
    this.radius = radius;
  }
  Draw(): void {
    this.renderer.RenderCircle(this.radius);
  }
}

class Square extends Shape {
  private side: number;
  constructor(renderer: Renderer, side: number) {
    super(renderer);
    this.side = side;
  }
  Draw(): void {
    this.renderer.RenderSquare(this.side);
  }
}

class Triangle extends Shape {
  private base: number;
  constructor(renderer: Renderer, base: number) {
    super(renderer);
    this.base = base;
  }
  Draw(): void {
    this.renderer.RenderTriangle(this.base);
  }
}

export function runBridgeTask() {
  console.log('\n--- ЗАВДАННЯ 3: МІСТ ---');
  const vector = new VectorRenderer();
  const raster = new RasterRenderer();

  new Circle(vector, 5).Draw();
  new Square(raster, 10).Draw();
  new Triangle(vector, 7).Draw();
}