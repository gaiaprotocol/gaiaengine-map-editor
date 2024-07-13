import { DomNode } from "@common-module/app";
import { SpritesheetData } from "pixi.js";
export default class ObjectEditor extends DomNode {
    constructor(spritesheets: {
        [id: string]: {
            src: string;
            atlas: SpritesheetData;
        };
    }, objects: {
        [id: string]: {
            spritesheet: string;
            frame: string;
            zIndex: number;
        };
    });
    show(): void;
    hide(): void;
}
//# sourceMappingURL=ObjectEditor.d.ts.map