import { DomNode } from "@common-module/app";
import { TilemapData } from "@gaiaengine/2d";
export default class TilemapSection extends DomNode {
    private projectId;
    private tilemapData;
    private transformStore;
    private x;
    private y;
    private zoom;
    private dragging;
    private dragX;
    private dragY;
    private tileSizeInput;
    private screen;
    private xInput;
    private yInput;
    private zoomInput;
    private grid;
    private hoverTile;
    constructor(projectId: string, tilemapData: TilemapData);
    private touchMoveHandler;
    private resizeScreen;
}
//# sourceMappingURL=TilemapSection.d.ts.map