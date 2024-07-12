import { DomNode } from "@common-module/app";

export default class TerrainEditor extends DomNode {
  constructor() {
    super(".terrain-editor");
    this.append("Terrain Editor");
  }

  public show() {
    this.deleteClass("hidden");
  }

  public hide() {
    this.addClass("hidden");
  }
}
