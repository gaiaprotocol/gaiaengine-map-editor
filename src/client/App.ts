import { AppNavBar, BodyNode, el, MaterialIcon } from "@common-module/app";
import { SpritesheetData } from "pixi.js";
import MapData from "./MapData.js";
import MapEditor from "./map/MapEditor.js";
import ObjectEditor from "./object/ObjectEditor.js";
import TerrainEditor from "./terrain/TerrainEditor.js";

export default class App {
  private navBar: AppNavBar;

  private terrainEditor: TerrainEditor;
  private objectEditor: ObjectEditor;
  private mapEditor: MapEditor;

  constructor(
    spritesheets: { [id: string]: { src: string; atlas: SpritesheetData } },
    mapData: MapData,
  ) {
    BodyNode.append(
      el(
        "section.app",
        this.navBar = new AppNavBar({
          id: "gaiaengine-map-editor-nav-bar",
          menu: [{
            id: "terrain",
            icon: new MaterialIcon("terrain"),
            title: "Terrain",
          }, {
            id: "objects",
            icon: new MaterialIcon("park"),
            title: "Objects",
          }, {
            id: "map",
            icon: new MaterialIcon("map"),
            title: "Map",
          }],
        }),
      ),
      el(
        "section.editor",
        this.terrainEditor = new TerrainEditor(),
        this.objectEditor = new ObjectEditor(),
        this.mapEditor = new MapEditor(),
      ),
    );

    this.navBar.on("select", (id: string) => {
      [this.terrainEditor, this.objectEditor, this.mapEditor]
        .forEach((e) => e.hide());
      if (id === "terrain") this.terrainEditor.show();
      else if (id === "objects") this.objectEditor.show();
      else if (id === "map") this.mapEditor.show();
    }).init();
  }
}
