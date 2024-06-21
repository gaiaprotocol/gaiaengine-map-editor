import Grid from "./Grid.js";
export default class FixedGrid extends Grid {
    private width;
    private height;
    private lines;
    private dashedLines;
    constructor(x: number, y: number, tileSize: number, width: number, height: number);
    private drawLines;
    set tileSize(tileSize: number);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=FixedGrid.d.ts.map