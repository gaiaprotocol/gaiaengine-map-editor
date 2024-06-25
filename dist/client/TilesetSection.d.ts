import { DomNode } from "@common-module/app";
export default class TilesetSection extends DomNode {
    private projectId;
    private tilesets;
    private transformStore;
    private tilesetTransforms;
    private dragging;
    private dragX;
    private dragY;
    private tabs;
    private screen;
    private xInput;
    private yInput;
    private zoomInput;
    private tileset;
    private getTilesetTransform;
    constructor(projectId: string, tileSize: number, tilesets: {
        [key: string]: string;
    });
    private resizeScreen;
    set tileSize(tileSize: number);
}
//# sourceMappingURL=TilesetSection.d.ts.map