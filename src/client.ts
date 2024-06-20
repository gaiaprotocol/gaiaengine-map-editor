import { BodyNode, el } from "@common-module/app";
import Config from "./Config.js";
import TilemapSection from "./client/TilemapSection.js";
import TilesetSection from "./client/TilesetSection.js";

const config = (window as any).config as Config;

BodyNode.append(
  el(
    "#layout",
    new TilesetSection(config.projectId, config.tilesetImages),
    new TilemapSection(),
  ),
);
