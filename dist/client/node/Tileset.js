import { ColliderType, Node, Sprite, TouchChecker, TouchEventType, } from "@gaiaengine/2d";
import FixedGrid from "./FixedGrid.js";
import HoverTileDisplay from "./HoverTileDisplay.js";
import SelectedTileDisplay from "./SelectedTileDisplay.js";
export default class Tileset extends Node {
    _tileSize;
    grid;
    hoverTile;
    selectedTile;
    touchstartX = 0;
    touchstartY = 0;
    constructor(src, _tileSize, onTileSelect) {
        super(0, 0);
        this._tileSize = _tileSize;
        const image = new Sprite(0, 0, src, undefined, undefined, () => {
            const touchCollider = {
                type: ColliderType.Rect,
                x: image.width / 2 - this._tileSize / 2,
                y: image.height / 2 - this._tileSize / 2,
                width: image.width,
                height: image.height,
            };
            let tileSystem;
            this.append(this.grid = new FixedGrid(0, 0, this._tileSize, image.width, image.height), tileSystem = new Node(-image.width / 2 + this._tileSize / 2, -image.height / 2 + this._tileSize / 2, new TouchChecker(TouchEventType.TouchStart, touchCollider, (rx, ry, cx, cy) => {
                this.touchstartX = cx;
                this.touchstartY = cy;
            }), new TouchChecker(TouchEventType.TouchMove, touchCollider, (rx, ry) => {
                const row = Math.floor(ry / this._tileSize + 0.5);
                const col = Math.floor(rx / this._tileSize + 0.5);
                if (this.hoverTile && this.hoverTile.row === row &&
                    this.hoverTile.col === col)
                    return;
                this.hoverTile?.delete();
                this.hoverTile = new HoverTileDisplay(this._tileSize, row, col)
                    .appendTo(tileSystem);
            }), new TouchChecker(TouchEventType.TouchEnd, touchCollider, (rx, ry, cx, cy) => {
                if (Math.abs(cx - this.touchstartX) >= 5 ||
                    Math.abs(cy - this.touchstartY) >= 5)
                    return;
                const row = Math.floor(ry / this._tileSize + 0.5);
                const col = Math.floor(rx / this._tileSize + 0.5);
                this.selectedTile?.delete();
                this.selectedTile = new SelectedTileDisplay(this._tileSize, row, col).appendTo(tileSystem);
                onTileSelect(row, col);
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