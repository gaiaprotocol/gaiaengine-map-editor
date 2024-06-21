import { BodyNode, el } from "@common-module/app";
import { TilemapData } from "@gaiaengine/2d";
import Config from "./Config.js";
import TilemapSection from "./client/TilemapSection.js";
import TilesetSection from "./client/TilesetSection.js";

const config = (window as any).config as Config;
const tilemapData: TilemapData = await fetch(
  "/api/load-assets/assets/tilemap.json",
).then((response) => response.json());

BodyNode.append(
  el(
    "#layout",
    new TilesetSection(config.projectId, config.tilesetImages),
    new TilemapSection(config.projectId, tilemapData),
  ),
);
