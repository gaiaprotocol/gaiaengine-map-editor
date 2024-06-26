import { BodyNode, el } from "@common-module/app";
import { TilemapData } from "@gaiaengine/2d";
import Config from "./Config.js";
import TilemapSection from "./client/TilemapSection.js";
import TilesetSection from "./client/TilesetSection.js";

const config = (window as any).config as Config;
const tilemapData: TilemapData = await fetch(
  "/api/load-assets/assets/tilemap.json",
).then((response) => response.json());

const tilesetSection = new TilesetSection(
  config.projectId,
  tilemapData.tileSize,
  config.tilesetImages,
);
tilesetSection.on(
  "tileSelected",
  (tilesetKey, row, col) => tilemapSection.setTile(tilesetKey, row, col),
);

const tilemapSection = new TilemapSection(
  config.projectId,
  config.tilesetImages,
  tilemapData,
);
tilemapSection.on(
  "tileSizeChange",
  (tileSize) => tilesetSection.tileSize = tileSize,
);

BodyNode.append(el("#layout", tilesetSection, tilemapSection));
