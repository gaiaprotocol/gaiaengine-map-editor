import Grid, { LINE_COLOR, LINE_WIDTH } from "./Grid.js";
export default class FixedGrid extends Grid {
    width;
    height;
    lines = [];
    dashedLines = [];
    constructor(x, y, tileSize, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
    }
    drawLines() {
        this.graphics.clear();
        for (const line of this.lines) {
            this.drawLine(...line);
        }
        for (const line of this.dashedLines) {
            this.drawDashedLine(...line);
        }
    }
    set tileSize(tileSize) {
        this.lines = [];
        this.dashedLines = [];
        this.lines.push([
            -this.width / 2,
            -this.height / 2,
            this.width / 2,
            -this.height / 2,
        ]);
        this.lines.push([
            this.width / 2,
            -this.height / 2,
            this.width / 2,
            this.height / 2,
        ]);
        this.lines.push([
            this.width / 2,
            this.height / 2,
            -this.width / 2,
            this.height / 2,
        ]);
        this.lines.push([
            -this.width / 2,
            this.height / 2,
            -this.width / 2,
            -this.height / 2,
        ]);
        for (let i = 0; i < this.width / tileSize; i++) {
            this.dashedLines.push([
                -this.width / 2 + i * tileSize,
                -this.height / 2,
                -this.width / 2 + i * tileSize,
                this.height / 2,
            ]);
        }
        for (let i = 0; i < this.height / tileSize; i++) {
            this.dashedLines.push([
                -this.width / 2,
                -this.height / 2 + i * tileSize,
                this.width / 2,
                -this.height / 2 + i * tileSize,
            ]);
        }
        this.drawLines();
    }
    update(deltaTime) {
        if (this.screen && this.currentScale !== this.screen.camera.scale) {
            this.currentScale = this.screen.camera.scale;
            this.graphics.setStrokeStyle({
                width: LINE_WIDTH / this.screen.camera.scale,
                color: LINE_COLOR,
            });
            this.drawLines();
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=FixedGrid.js.map