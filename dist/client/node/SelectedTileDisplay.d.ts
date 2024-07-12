import { Node } from "@gaiaengine/2d";
export default class SelectedTileDisplay extends Node {
    private tileSize;
    private _row;
    private _col;
    private graphics;
    constructor(tileSize: number, row: number, col: number);
    set row(row: number);
    get row(): number;
    set col(col: number);
    get col(): number;
    setTilePosition(row: number, col: number): void;
    private updatePosition;
    private drawSelection;
    private drawLShape;
}
//# sourceMappingURL=SelectedTileDisplay.d.ts.map