import { BodyNode, el } from "@common-module/app";
import TilemapSection from "./client/TilemapSection.js";
import TilesetSection from "./client/TilesetSection.js";
const config = window.config;
const tilemapData = await fetch("/api/load-assets/assets/tilemap.json").then((response) => response.json());
const tilesetSection = new TilesetSection(config.projectId, tilemapData.tileSize, config.tilesetImages);
tilesetSection.on("tileSelected", (tilesetId, row, col) => tilemapSection.setTile(tilesetId, row, col));
const tilemapSection = new TilemapSection(config.projectId, config.tilesetImages, tilemapData);
tilemapSection.on("tileSizeChange", (tileSize) => tilesetSection.tileSize = tileSize);
BodyNode.append(el("#layout", tilesetSection, tilemapSection));
//# sourceMappingURL=client.js.map