import { DomNode } from "@common-module/app";

export default class MapEditor extends DomNode {
  constructor() {
    super(".map-editor");
    this.append("Map Editor");
  }

  public show() {
    this.deleteClass("hidden");
  }

  public hide() {
    this.addClass("hidden");
  }
}
