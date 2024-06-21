import { DomNode } from "@common-module/app";
export default abstract class TransfromEditingSection extends DomNode {
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
    private getTilesetTransform;
    constructor(projectId: string, tilesets: {
        [key: string]: string;
    });
    private resizeScreen;
}
//# sourceMappingURL=TransfromEditingSection.d.ts.map