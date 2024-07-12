import { DomNode } from "@common-module/app";
import { Sprite } from "@gaiaengine/dom";
import { SpritesheetData } from "pixi.js";

export default class FileTreeIcon extends DomNode {
  constructor(
    private src: string,
    private atlas?: SpritesheetData,
    private frame?: string,
  ) {
    super(".file-tree-icon");
  }

  public clone() {
    const clone = super.clone();
    clone.domElement.append(
      new Sprite(
        0,
        0,
        this.src,
        this.atlas,
        this.frame,
      ).container,
    );
    return clone;
  }
}
