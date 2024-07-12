import { SpritesheetData } from "pixi.js";
import Config from "./Config.js";
import App from "./client/App.js";
import MapData from "./client/MapData.js";

const config = (window as any).config as Config;
const spritesheets: {
  [id: string]: { src: string; atlas: SpritesheetData };
} = {};
for (const id in config.spritesheets) {
  const { src, atlas } = config.spritesheets[id];
  spritesheets[id] = {
    src: `/api/load-assets/${src}`,
    atlas: await fetch(`/api/load-assets/${atlas}`).then((response) =>
      response.json()
    ),
  };
}
const mapData: MapData = await fetch(`/api/load-assets/${config.mapJsonPath}`)
  .then((response) => response.json());
new App(spritesheets, mapData);
