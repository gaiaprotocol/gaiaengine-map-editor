import { DomNode, el, Tabs } from "@common-module/app";
export default class TilesetSection extends DomNode {
    tabs;
    constructor(projectId, tilesets) {
        super("section.tileset");
        this.append(this.tabs = new Tabs(`tileset-tabs-${projectId}`, Object.keys(tilesets).map((key) => ({
            id: key,
            label: key,
        }))), el("main"), el("footer"));
        this.tabs.on("select", (id) => {
            console.log("Selected tileset:", id);
        }).init();
    }
}
//# sourceMappingURL=TilesetSection.js.map