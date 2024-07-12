import { DomNode, el, FileTree, FileTreeNodeData } from "@common-module/app";
import { SpritesheetData } from "pixi.js";
import FileTreeIcon from "../FileTreeIcon.js";

export default class ObjectEditor extends DomNode {
  constructor(
    spritesheets: { [id: string]: { src: string; atlas: SpritesheetData } },
    objects: {
      [id: string]: {
        spritesheet: string;
        frame: string;
        zIndex: number;
      };
    },
  ) {
    super(".object-editor");

    const fileTreeData: FileTreeNodeData[] = [];
    for (const objectId in objects) {
      const object = objects[objectId];
      fileTreeData.push({
        icon: new FileTreeIcon(
          spritesheets[object.spritesheet].src,
          spritesheets[object.spritesheet].atlas,
          object.frame,
        ),
        name: objectId,
      });
    }

    this.append(el(".object-list", new FileTree(fileTreeData)));
  }

  public show() {
    this.deleteClass("hidden");
  }

  public hide() {
    this.addClass("hidden");
  }
}
