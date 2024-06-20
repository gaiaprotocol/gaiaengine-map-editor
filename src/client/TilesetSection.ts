import { DomNode, el, Tabs } from "@common-module/app";
import { Image, Screen } from "@gaiaengine/2d";

export default class TilesetSection extends DomNode {
  private tabs: Tabs;
  private screen: Screen;

  constructor(projectId: string, private tilesets: { [key: string]: string }) {
    super("section.tileset");
    this.append(
      this.tabs = new Tabs(
        `tileset-tabs-${projectId}`,
        Object.keys(tilesets).map((key) => ({
          id: key,
          label: key,
        })),
      ),
      el("main", this.screen = new Screen(0, 0)),
      el("footer"),
    );

    this.tabs.on("select", (id) => {
      this.screen.root.empty();
      this.screen.root.append(
        new Image(0, 0, `api/load-assets/${tilesets[id]}`),
      );
    }).init();

    this.on("visible", () => this.resizeScreen());
    this.onWindow("resize", () => this.resizeScreen());
  }

  private resizeScreen() {
    const rect = this.screen.parent!.rect;
    this.screen.resize(rect.width, rect.height);
  }
}
