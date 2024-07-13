import { DomNode } from "@common-module/app";
import { SpritesheetData } from "pixi.js";
import MapData from "../MapData.js";
export default class MapEditor extends DomNode {
    constructor(spritesheets: {
        [id: string]: {
            src: string;
            atlas: SpritesheetData;
        };
    }, mapData: MapData);
    show(): void;
    hide(): void;
}
//# sourceMappingURL=MapEditor.d.ts.map