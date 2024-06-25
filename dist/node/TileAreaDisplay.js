import { Node } from "@gaiaengine/2d";
import { Graphics } from "pixi.js";
export default class TileAreaDisplay extends Node {
    tileSize;
    _row = 0;
    _col = 0;
    constructor(tileSize, row, col) {
        super(0, 0);
        this.tileSize = tileSize;
        this.container.addChild(new Graphics().rect(0, 0, this.tileSize, this.tileSize).stroke({
            color: 0xFF0000,
            width: 2,
            alpha: 0.3,
        }));
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
    }
}
//# sourceMappingURL=TileAreaDisplay.js.map