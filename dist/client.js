import { BodyNode, el } from "@common-module/app";
import TilemapSection from "./client/TilemapSection.js";
import TilesetSection from "./client/TilesetSection.js";
const config = window.config;
const tilemapData = await fetch("/api/load-assets/assets/tilemap.json").then((response) => response.json());
BodyNode.append(el("#layout", new TilesetSection(config.projectId, config.tilesetImages), new TilemapSection(config.projectId, tilemapData)));
//# sourceMappingURL=client.js.map