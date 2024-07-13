import { DomNode, el, FileTree, MaterialIcon, } from "@common-module/app";
import FileTreeIcon from "../FileTreeIcon.js";
export default class MapEditor extends DomNode {
    constructor(spritesheets, mapData) {
        super(".map-editor");
        const terrainFileTreeData = [];
        const objectsFileTreeData = [];
        for (const terrainId in mapData.terrains) {
            const terrain = mapData.terrains[terrainId];
            terrainFileTreeData.push({
                icon: new FileTreeIcon(spritesheets[terrain.center[0].spritesheet].src, spritesheets[terrain.center[0].spritesheet].atlas, terrain.center[0].frame),
                name: terrainId,
            });
        }
        for (const objectId in mapData.objects) {
            const object = mapData.objects[objectId];
            objectsFileTreeData.push({
                icon: new FileTreeIcon(spritesheets[object.spritesheet].src, spritesheets[object.spritesheet].atlas, object.frame),
                name: objectId,
            });
        }
        this.append(el(".terrain-and-object-list", new FileTree("map-editor-file-tree", [{
                icon: new MaterialIcon("terrain"),
                name: "Terrains",
                children: terrainFileTreeData,
            }, {
                icon: new MaterialIcon("park"),
                name: "Objects",
                children: objectsFileTreeData,
            }])));
    }
    show() {
        this.deleteClass("hidden");
    }
    hide() {
        this.addClass("hidden");
    }
}
//# sourceMappingURL=MapEditor.js.map