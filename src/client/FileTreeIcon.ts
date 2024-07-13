import { DomNode } from "@common-module/app";
import { Sprite } from "@gaiaengine/dom";
import { SpritesheetData } from "pixi.js";

export default class FileTreeIcon extends DomNode {
  constructor(
    private src: string,
    private atlas: SpritesheetData,
    private frame: string,
    private size: number = 32,
  ) {
    super(".file-tree-icon");
  }

  public clone() {
    const clone = super.clone();
    const sprite = new Sprite(
      0,
      0,
      this.src,
      this.atlas,
      this.frame,
    );
    sprite.setSize(this.size, this.size);
    clone.domElement.append(sprite.container);
    return clone;
  }
}
