import { DomNode, el } from "@common-module/app";

export default class TilemapSection extends DomNode {
  constructor() {
    super("section.tilemap");
    this.append(
      el("header"),
      el("main", "Test"),
      el("footer"),
    );
  }
}
