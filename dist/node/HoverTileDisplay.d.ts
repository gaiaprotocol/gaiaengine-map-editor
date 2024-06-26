import { Node } from "@gaiaengine/2d";
import { Texture } from "pixi.js";
export default class HoverTileDisplay extends Node {
    private tileSize;
    private _row;
    private _col;
    constructor(tileSize: number, row: number, col: number, tileTexture?: Texture);
    set row(row: number);
    get row(): number;
    set col(col: number);
    get col(): number;
    setTilePosition(row: number, col: number): void;
    private updatePosition;
}
//# sourceMappingURL=HoverTileDisplay.d.ts.map