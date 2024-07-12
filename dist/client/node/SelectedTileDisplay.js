import { Node } from "@gaiaengine/2d";
import { Graphics } from "pixi.js";
export default class SelectedTileDisplay extends Node {
    tileSize;
    _row = 0;
    _col = 0;
    graphics;
    constructor(tileSize, row, col) {
        super(0, 0);
        this.tileSize = tileSize;
        this.graphics = new Graphics();
        this.container.addChild(this.graphics);
        this.setTilePosition(row, col);
    }
    set row(row) {
        this._row = row;
        this.updatePosition();
    }
    get row() {
        return this._row;
    }
    set col(col) {
        this._col = col;
        this.updatePosition();
    }
    get col() {
        return this._col;
    }
    setTilePosition(row, col) {
        this._row = row;
        this._col = col;
        this.updatePosition();
    }
    updatePosition() {
        this.setPosition(this._col * this.tileSize - this.tileSize / 2, this._row * this.tileSize - this.tileSize / 2);
        this.drawSelection();
    }
    drawSelection() {
        const cornerLength = this.tileSize / 3;
        const color = 0xFF0000;
        const width = 2;
        this.graphics.clear().setStrokeStyle({ color, width });
        this.drawLShape(0, 0, cornerLength, false, false);
        this.drawLShape(this.tileSize, 0, cornerLength, true, false);
        this.drawLShape(0, this.tileSize, cornerLength, false, true);
        this.drawLShape(this.tileSize, this.tileSize, cornerLength, true, true);
    }
    drawLShape(x, y, length, flipX, flipY) {
        const xDir = flipX ? -1 : 1;
        const yDir = flipY ? -1 : 1;
        this.graphics.moveTo(x, y).lineTo(x + length * xDir, y).stroke();
        this.graphics.moveTo(x, y).lineTo(x, y + length * yDir).stroke();
    }
}
//# sourceMappingURL=SelectedTileDisplay.js.map