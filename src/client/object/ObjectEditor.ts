import { DomNode } from "@common-module/app";

export default class ObjectEditor extends DomNode {
  constructor() {
    super(".object-editor");
    this.append("Object Editor");
  }

  public show() {
    this.deleteClass("hidden");
  }

  public hide() {
    this.addClass("hidden");
  }
}
