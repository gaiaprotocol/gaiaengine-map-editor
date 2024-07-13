import { DomNode, el, FileTree } from "@common-module/app";
import FileTreeIcon from "../FileTreeIcon.js";
export default class ObjectEditor extends DomNode {
    constructor(spritesheets, objects) {
        super(".object-editor");
        const fileTreeData = [];
        for (const objectId in objects) {
            const object = objects[objectId];
            fileTreeData.push({
                icon: new FileTreeIcon(spritesheets[object.spritesheet].src, spritesheets[object.spritesheet].atlas, object.frame),
                name: objectId,
            });
        }
        this.append(el(".object-list", new FileTree("object-editor-file-tree", fileTreeData)));
    }
    show() {
        this.deleteClass("hidden");
    }
    hide() {
        this.addClass("hidden");
    }
}
//# sourceMappingURL=ObjectEditor.js.map