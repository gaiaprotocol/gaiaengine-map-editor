import { Node } from "@gaiaengine/2d";
import { Graphics } from "pixi.js";

export default class SelectedTileDisplay extends Node {
  private _row = 0;
  private _col = 0;
  private graphics: Graphics;

  constructor(private tileSize: number, row: number, col: number) {
    super(0, 0);
    this.graphics = new Graphics();
    this.container.addChild(this.graphics);
    this.setTilePosition(row, col);
  }

  public set row(row: number) {
    this._row = row;
    this.updatePosition();
  }

  public get row() {
    return this._row;
  }

  public set col(col: number) {
    this._col = col;
    this.updatePosition();
  }

  public get col() {
    return this._col;
  }

  public setTilePosition(row: number, col: number) {
    this._row = row;
    this._col = col;
    this.updatePosition();
  }

  private updatePosition() {
    this.setPosition(
      this._col * this.tileSize - this.tileSize / 2,
      this._row * this.tileSize - this.tileSize / 2,
    );
    this.drawSelection();
  }

  private drawSelection() {
    const cornerLength = this.tileSize / 3;
    const color = 0xFF0000;
    const width = 2;

    this.graphics.clear().setStrokeStyle({ color, width });

    this.drawLShape(0, 0, cornerLength, false, false);
    this.drawLShape(this.tileSize, 0, cornerLength, true, false);
    this.drawLShape(0, this.tileSize, cornerLength, false, true);
    this.drawLShape(this.tileSize, this.tileSize, cornerLength, true, true);
  }

  private drawLShape(
    x: number,
    y: number,
    length: number,
    flipX: boolean,
    flipY: boolean,
  ) {
    const xDir = flipX ? -1 : 1;
    const yDir = flipY ? -1 : 1;

    this.graphics.moveTo(x, y).lineTo(x + length * xDir, y).stroke();
    this.graphics.moveTo(x, y).lineTo(x, y + length * yDir).stroke();
  }
}
