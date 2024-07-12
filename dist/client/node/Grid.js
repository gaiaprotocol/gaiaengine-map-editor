import { Node } from "@gaiaengine/2d";
import { Graphics } from "pixi.js";
export const LINE_WIDTH = 1;
export const LINE_COLOR = 0x000000;
const DASH_LENGTH = 5;
const GAP_LENGTH = 3;
export default class Grid extends Node {
    currentScale;
    graphics;
    constructor(x, y) {
        super(x, y);
        this.graphics = new Graphics();
        this.graphics.setStrokeStyle({ width: LINE_WIDTH, color: LINE_COLOR });
        this.container.addChild(this.graphics);
    }
    drawLine(x1, y1, x2, y2) {
        this.graphics.moveTo(x1, y1).lineTo(x2, y2).stroke();
    }
    drawDashedLine(x1, y1, x2, y2) {
        if (!this.currentScale)
            return;
        const dashLength = DASH_LENGTH / this.currentScale;
        const gapLength = GAP_LENGTH / this.currentScale;
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const dashCount = Math.floor(delta / (dashLength + gapLength));
        const dashX = deltaX / dashCount;
        const dashY = deltaY / dashCount;
        let posX = x1;
        let posY = y1;
        for (let i = 0; i < dashCount; i++) {
            this.graphics.moveTo(posX, posY);
            posX += dashX * dashLength / (dashLength + gapLength);
            posY += dashY * dashLength / (dashLength + gapLength);
            this.graphics.lineTo(posX, posY).stroke();
            posX += dashX * gapLength / (dashLength + gapLength);
            posY += dashY * gapLength / (dashLength + gapLength);
        }
    }
}
//# sourceMappingURL=Grid.js.map