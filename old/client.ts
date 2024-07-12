import { BodyNode, el } from "@common-module/app";
import { SpritesheetData } from "pixi.js";
import Config from "./Config.js";
import MapData from "./client/MapData.js";
import TilemapSection from "./client/TilemapSection.js";
import TilesetSection from "./client/TilesetSection.js";

const config = (window as any).config as Config;
const mapData: MapData = await fetch(`/api/load-assets/${config.mapJsonPath}`)
  .then((response) => response.json());
const spritesheets: {
  [id: string]: { src: string; atlas: SpritesheetData };
} = {};
for (const id in config.spritesheets) {
  const { src, atlas } = config.spritesheets[id];
  spritesheets[id] = {
    src,
    atlas: await fetch(`/api/load-assets/${atlas}`).then((response) =>
      response.json()
    ),
  };
}

const tilesetSection = new TilesetSection(
  config.projectId,
  config.tileSize,
  spritesheets,
);
tilesetSection.on(
  "tileSelected",
  (tilesetId, row, col) => tilemapSection.setTile(tilesetId, row, col),
);

const tilemapSection = new TilemapSection(
  config.projectId,
  spritesheets,
  mapData,
);
tilemapSection.on(
  "tileSizeChange",
  (tileSize) => tilesetSection.tileSize = tileSize,
);

BodyNode.append(el("#layout", tilesetSection, tilemapSection));
