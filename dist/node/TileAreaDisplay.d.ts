import { Node } from "@gaiaengine/2d";
export default class TileAreaDisplay extends Node {
    private tileSize;
    private _row;
    private _col;
    constructor(tileSize: number, row: number, col: number);
    set row(row: number);
    get row(): number;
    set col(col: number);
    get col(): number;
    setTilePosition(row: number, col: number): void;
    private updatePosition;
}
//# sourceMappingURL=TileAreaDisplay.d.ts.map