import { DomNode } from "@common-module/app";
import { SpritesheetData } from "pixi.js";
export default class FileTreeIcon extends DomNode {
    private src;
    private atlas;
    private frame;
    private size;
    constructor(src: string, atlas: SpritesheetData, frame: string, size?: number);
    clone(): DomNode<HTMLElement, DomNode<HTMLElement, any>>;
}
//# sourceMappingURL=FileTreeIcon.d.ts.map