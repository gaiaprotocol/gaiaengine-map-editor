import { Text } from "@gaiaengine/2d";
import Grid, { LINE_COLOR, LINE_WIDTH } from "./Grid.js";
export default class InfiniteGrid extends Grid {
    _tileSize;
    lastCameraX = 0;
    lastCameraY = 0;
    constructor(x, y, _tileSize) {
        super(x, y);
        this._tileSize = _tileSize;
        this.append(new Text(0, 10, "(0, 0)", { userSelect: "none" }));
    }
    drawLines() {
        if (!this.screen)
            return;
        this.graphics.clear();
        const scale = this.screen.root.scale;
        if (scale < 1)
            return;
        const left = -this.screen.width / 2 / scale + this.screen.camera.x / scale;
        const right = this.screen.width / 2 / scale + this.screen.camera.x / scale;
        const top = -this.screen.height / 2 / scale + this.screen.camera.y / scale;
        const bottom = this.screen.height / 2 / scale +
            this.screen.camera.y / scale;
        const startX = Math.floor(left / this._tileSize) * this._tileSize +
            this._tileSize / 2;
        const endX = Math.ceil(right / this._tileSize) * this._tileSize +
            this._tileSize / 2;
        const startY = Math.floor(top / this._tileSize) * this._tileSize +
            this._tileSize / 2;
        const endY = Math.ceil(bottom / this._tileSize) * this._tileSize +
            this._tileSize / 2;
        for (let x = startX; x <= endX; x += this._tileSize) {
            this.drawDashedLine(x, startY - this._tileSize / 2, x, endY + this._tileSize / 2);
        }
        for (let y = startY; y <= endY; y += this._tileSize) {
            this.drawDashedLine(startX - this._tileSize / 2, y, endX + this._tileSize / 2, y);
        }
    }
    set tileSize(tileSize) {
        this._tileSize = tileSize;
        this.drawLines();
    }
    update(deltaTime) {
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
//# sourceMappingURL=InfiniteGrid.js.map