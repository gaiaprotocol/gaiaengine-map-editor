import { Node } from "@gaiaengine/2d";
import { Graphics } from "pixi.js";

export default class TileAreaDisplay extends Node {
  private _row = 0;
  private _col = 0;

  constructor(private tileSize: number, row: number, col: number) {
    super(0, 0);
    this.container.addChild(
      new Graphics().rect(0, 0, this.tileSize, this.tileSize).stroke({
        color: 0xFF0000,
        width: 2,
        alpha: 0.3,
      }),
    );
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
  }
}
