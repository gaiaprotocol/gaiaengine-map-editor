import Grid from "./Grid.js";
export default class InfiniteGrid extends Grid {
    private _tileSize;
    private lastCameraX;
    private lastCameraY;
    constructor(x: number, y: number, _tileSize: number);
    private drawLines;
    set tileSize(tileSize: number);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=InfiniteGrid.d.ts.map