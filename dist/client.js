import { BodyNode, el } from "@common-module/app";
import TilemapSection from "./client/TilemapSection.js";
import TilesetSection from "./client/TilesetSection.js";
const config = window.config;
BodyNode.append(el("#layout", new TilesetSection(config.projectId, config.tilesetImages), new TilemapSection()));
//# sourceMappingURL=client.js.map