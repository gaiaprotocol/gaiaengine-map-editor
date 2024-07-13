import { AppNavBar, BodyNode, el, MaterialIcon } from "@common-module/app";
import MapEditor from "./map/MapEditor.js";
import ObjectEditor from "./object/ObjectEditor.js";
import TerrainEditor from "./terrain/TerrainEditor.js";
export default class App {
    navBar;
    terrainEditor;
    objectEditor;
    mapEditor;
    constructor(spritesheets, mapData) {
        BodyNode.append(el("section.app", this.navBar = new AppNavBar({
            id: "gaiaengine-map-editor-nav-bar",
            menu: [{
                    id: "terrain",
                    icon: new MaterialIcon("terrain"),
                    title: "Terrain",
                }, {
                    id: "objects",
                    icon: new MaterialIcon("park"),
                    title: "Objects",
                }, {
                    id: "map",
                    icon: new MaterialIcon("map"),
                    title: "Map",
                }],
        })), el("section.editor", this.terrainEditor = new TerrainEditor(spritesheets, mapData.terrains), this.objectEditor = new ObjectEditor(spritesheets, mapData.objects), this.mapEditor = new MapEditor(spritesheets, mapData)));
        this.navBar.on("select", (id) => {
            [this.terrainEditor, this.objectEditor, this.mapEditor]
                .forEach((e) => e.hide());
            if (id === "terrain")
                this.terrainEditor.show();
            else if (id === "objects")
                this.objectEditor.show();
            else if (id === "map")
                this.mapEditor.show();
        }).init();
    }
}
//# sourceMappingURL=App.js.map