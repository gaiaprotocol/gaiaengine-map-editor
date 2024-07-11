import Grid, { LINE_COLOR, LINE_WIDTH } from "./Grid.js";

export default class FixedGrid extends Grid {
  private lines: [number, number, number, number][] = [];
  private dashedLines: [number, number, number, number][] = [];

  constructor(
    x: number,
    y: number,
    tileSize: number,
    private width: number,
    private height: number,
  ) {
    super(x, y);
    this.tileSize = tileSize;
  }

  private drawLines(): void {
    this.graphics.clear();
    for (const line of this.lines) {
      this.drawLine(...line);
    }
    for (const line of this.dashedLines) {
      this.drawDashedLine(...line);
    }
  }

  public set tileSize(tileSize: number) {
    this.lines = [];
    this.dashedLines = [];

    this.lines.push([
      -this.width / 2,
      -this.height / 2,
      this.width / 2,
      -this.height / 2,
    ]);
    this.lines.push([
      this.width / 2,
      -this.height / 2,
      this.width / 2,
      this.height / 2,
    ]);
    this.lines.push([
      this.width / 2,
      this.height / 2,
      -this.width / 2,
      this.height / 2,
    ]);
    this.lines.push([
      -this.width / 2,
      this.height / 2,
      -this.width / 2,
      -this.height / 2,
    ]);

    for (let i = 0; i < this.width / tileSize; i++) {
      this.dashedLines.push([
        -this.width / 2 + i * tileSize,
        -this.height / 2,
        -this.width / 2 + i * tileSize,
        this.height / 2,
      ]);
    }

    for (let i = 0; i < this.height / tileSize; i++) {
      this.dashedLines.push([
        -this.width / 2,
        -this.height / 2 + i * tileSize,
        this.width / 2,
        -this.height / 2 + i * tileSize,
      ]);
    }

    this.drawLines();
  }

  protected update(deltaTime: number): void {
    if (this.screen && this.currentScale !== this.screen.camera.scale) {
      this.currentScale = this.screen.camera.scale;
      this.graphics.setStrokeStyle({
        width: LINE_WIDTH / this.screen.camera.scale,
        color: LINE_COLOR,
      });
      this.drawLines();
    }
    super.update(deltaTime);
  }
}
