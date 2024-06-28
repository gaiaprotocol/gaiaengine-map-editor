import { DomNode } from "@common-module/app";
import { TilemapData } from "@gaiaengine/2d";
export default class TilemapSection extends DomNode {
    private projectId;
    private tilesets;
    private tilemapData;
    private transformStore;
    private x;
    private y;
    private zoom;
    private dragging;
    private dragX;
    private dragY;
    private touchstartX;
    private touchstartY;
    private tileSizeInput;
    private screen;
    private xInput;
    private yInput;
    private zoomInput;
    private tilemap;
    private grid;
    private hoverTile;
    private selectedTile;
    constructor(projectId: string, tilesets: {
        [key: string]: string;
    }, tilemapData: TilemapData);
    private getRowColFromEvent;
    private touchMoveHandler;
    private resizeScreen;
    setTile(tilesetId: string, row: number, col: number): void;
}
//# sourceMappingURL=TilemapSection.d.ts.map