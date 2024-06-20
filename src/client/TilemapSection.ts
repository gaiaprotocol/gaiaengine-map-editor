import { DomNode, el } from "@common-module/app";
import { Screen } from "@gaiaengine/2d";

export default class TilemapSection extends DomNode {
  private screen: Screen;

  constructor() {
    super("section.tilemap");

    this.append(
      el("header"),
      el("main", this.screen = new Screen(0, 0)),
      el("footer"),
    );

    this.on("visible", () => this.resizeScreen());
    this.onWindow("resize", () => this.resizeScreen());
  }

  private resizeScreen() {
    const rect = this.screen.parent!.rect;
    this.screen.resize(rect.width, rect.height);
  }
}
