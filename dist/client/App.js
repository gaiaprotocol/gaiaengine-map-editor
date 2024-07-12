import { AppNavBar, BodyNode, el, MaterialIcon, } from "@common-module/app";
export default class App {
    navBar;
    editorSection;
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
        })), this.editorSection = el("section.editor", {
            "data-empty-message": "Select menu to start editing",
        }));
        this.navBar.on("select", (id) => {
        }).init();
    }
}
//# sourceMappingURL=App.js.map