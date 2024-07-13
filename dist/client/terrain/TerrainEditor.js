import { DomNode, el, FileTree } from "@common-module/app";
import FileTreeIcon from "../FileTreeIcon.js";
export default class TerrainEditor extends DomNode {
    constructor(spritesheets, terrains) {
        super(".terrain-editor");
        const fileTreeData = [];
        for (const terrainId in terrains) {
            const terrain = terrains[terrainId];
            fileTreeData.push({
                icon: new FileTreeIcon(spritesheets[terrain.center[0].spritesheet].src, spritesheets[terrain.center[0].spritesheet].atlas, terrain.center[0].frame),
                name: terrainId,
            });
        }
        this.append(el(".terrain-list", new FileTree("terrain-editor-file-tree", fileTreeData)));
    }
    show() {
        this.deleteClass("hidden");
    }
    hide() {
        this.addClass("hidden");
    }
}
//# sourceMappingURL=TerrainEditor.js.map