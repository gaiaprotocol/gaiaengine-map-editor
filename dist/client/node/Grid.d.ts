import { Node } from "@gaiaengine/2d";
import { Graphics } from "pixi.js";
export declare const LINE_WIDTH = 1;
export declare const LINE_COLOR = 0;
export default abstract class Grid extends Node {
    protected currentScale: number | undefined;
    protected graphics: Graphics;
    constructor(x: number, y: number);
    protected drawLine(x1: number, y1: number, x2: number, y2: number): void;
    protected drawDashedLine(x1: number, y1: number, x2: number, y2: number): void;
}
//# sourceMappingURL=Grid.d.ts.map