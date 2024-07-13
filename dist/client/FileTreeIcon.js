import { DomNode } from "@common-module/app";
import { Sprite } from "@gaiaengine/dom";
export default class FileTreeIcon extends DomNode {
    src;
    atlas;
    frame;
    size;
    constructor(src, atlas, frame, size = 32) {
        super(".file-tree-icon");
        this.src = src;
        this.atlas = atlas;
        this.frame = frame;
        this.size = size;
    }
    clone() {
        const clone = super.clone();
        const sprite = new Sprite(0, 0, this.src, this.atlas, this.frame);
        sprite.setSize(this.size, this.size);
        clone.domElement.append(sprite.container);
        return clone;
    }
}
//# sourceMappingURL=FileTreeIcon.js.map