import { DomNode, el, Tabs } from "@common-module/app";

export default class TilesetSection extends DomNode {
  private tabs: Tabs;

  constructor(projectId: string, tilesets: { [key: string]: string }) {
    super("section.tileset");
    this.append(
      this.tabs = new Tabs(
        `tileset-tabs-${projectId}`,
        Object.keys(tilesets).map((key) => ({
          id: key,
          label: key,
        })),
      ),
      el("main"),
      el("footer"),
    );

    this.tabs.on("select", (id) => {
      console.log("Selected tileset:", id);
    }).init();
  }
}
