import { Text } from "@gaiaengine/2d";
import { Graphics } from "pixi.js";
import Grid, { LINE_COLOR, LINE_WIDTH } from "./Grid.js";

export default class InfiniteGrid extends Grid {
  private lastCameraX: number = 0;
  private lastCameraY: number = 0;

  constructor(x: number, y: number, private _tileSize: number) {
    super(x, y);
    const centerGraphics = new Graphics();
    centerGraphics.rect(-1, -1, 2, 2).fill(0xff0000);
    this.container.addChild(centerGraphics);
    this.append(new Text(0, 10, "(0, 0)"));
  }

  private drawLines(): void {
    if (!this.screen) return;

    this.graphics.clear();

    const scale = this.screen.root.scale;
    if (scale < 1) return;

    const left = -this.screen.width / 2 / scale + this.screen.camera.x / scale;
    const right = this.screen.width / 2 / scale + this.screen.camera.x / scale;
    const top = -this.screen.height / 2 / scale + this.screen.camera.y / scale;
    const bottom = this.screen.height / 2 / scale +
      this.screen.camera.y / scale;

    const startX = Math.floor(left / this._tileSize) * this._tileSize;
    const endX = Math.ceil(right / this._tileSize) * this._tileSize;
    const startY = Math.floor(top / this._tileSize) * this._tileSize;
    const endY = Math.ceil(bottom / this._tileSize) * this._tileSize;

    for (let x = startX; x <= endX; x += this._tileSize) {
      if (x % (this._tileSize * 5) === 0) {
        this.drawLine(x, startY, x, endY);
      } else {
        this.drawDashedLine(x, startY, x, endY);
      }
    }

    for (let y = startY; y <= endY; y += this._tileSize) {
      if (y % (this._tileSize * 5) === 0) {
        this.drawLine(startX, y, endX, y);
      } else {
        this.drawDashedLine(startX, y, endX, y);
      }
    }
  }

  public set tileSize(tileSize: number) {
    this._tileSize = tileSize;
    this.drawLines();
  }

  protected update(deltaTime: number): void {
    if (this.screen) {
      const newScale = this.screen.root.scale;
      const cameraMoved = this.screen.camera.x !== this.lastCameraX ||
        this.screen.camera.y !== this.lastCameraY;
      if (newScale !== this.currentScale || cameraMoved) {
        this.currentScale = this.screen.root.scale;
        this.graphics.setStrokeStyle({
          width: LINE_WIDTH / this.screen.root.scale,
          color: LINE_COLOR,
        });
        this.lastCameraX = this.screen.camera.x;
        this.lastCameraY = this.screen.camera.y;
        this.drawLines();
      }
    }
    super.update(deltaTime);
  }
}
