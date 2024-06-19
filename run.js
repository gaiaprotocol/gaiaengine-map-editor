import run from "./dist/run.js";
run({
  webServerPort: 8080,
  tilesetImagePath: "tileset.png",
  tilesetJsonPath: "tileset.json",
  tilemapJsonPath: "tilemap.json",
});
