import { DomNode } from "@common-module/app";
import { SpritesheetData } from "pixi.js";
export default class TerrainEditor extends DomNode {
    constructor(spritesheets: {
        [id: string]: {
            src: string;
            atlas: SpritesheetData;
        };
    }, terrains: {
        [id: string]: {
            [direction: string]: {
                spritesheet: string;
                frame: string;
                zIndex: number;
            }[];
        };
    });
    show(): void;
    hide(): void;
}
//# sourceMappingURL=TerrainEditor.d.ts.map