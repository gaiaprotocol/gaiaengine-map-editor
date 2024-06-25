import { ColliderType, Image, Node, TouchChecker, TouchEventType, } from "@gaiaengine/2d";
import FixedGrid from "./FixedGrid.js";
import TileAreaDisplay from "./TileAreaDisplay.js";
export default class Tileset extends Node {
    _tileSize;
    grid;
    hoverTile;
    constructor(src, _tileSize) {
        super(0, 0);
        this._tileSize = _tileSize;
        const image = new Image(0, 0, src, () => {
            const touchCollider = {
                type: ColliderType.Rect,
                x: image.width / 2 - this._tileSize / 2,
                y: image.height / 2 - this._tileSize / 2,
                width: image.width,
                height: image.height,
            };
            let tileSystem;
            this.append(this.grid = new FixedGrid(0, 0, this._tileSize, image.width, image.height), tileSystem = new Node(-image.width / 2 + this._tileSize / 2, -image.height / 2 + this._tileSize / 2, new TouchChecker(TouchEventType.TouchStart, touchCollider, (rx, ry) => {
            }), new TouchChecker(TouchEventType.TouchMove, touchCollider, (rx, ry) => {
                const row = Math.floor(ry / this._tileSize + 0.5);
                const col = Math.floor(rx / this._tileSize + 0.5);
                if (this.hoverTile && this.hoverTile.row === row &&
                    this.hoverTile.col === col)
                    return;
                this.hoverTile?.delete();
                this.hoverTile = new TileAreaDisplay(this._tileSize, row, col)
                    .appendTo(tileSystem);
            }), new TouchChecker(TouchEventType.TouchEnd, touchCollider, (rx, ry) => {
            })));
        });
        this.append(image);
    }
    set tileSize(tileSize) {
        this._tileSize = tileSize;
        if (this.grid)
            this.grid.tileSize = tileSize;
    }
}
//# sourceMappingURL=Tileset.js.map