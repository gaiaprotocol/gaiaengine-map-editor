import { SpritesheetData } from "pixi.js";
import MapData from "./MapData.js";
export default class App {
    private navBar;
    private editorSection;
    private terrainEditor;
    private objectEditor;
    private mapEditor;
    constructor(spritesheets: {
        [id: string]: {
            src: string;
            atlas: SpritesheetData;
        };
    }, mapData: MapData);
}
//# sourceMappingURL=App.d.ts.map