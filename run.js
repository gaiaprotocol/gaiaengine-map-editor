import run from "./dist/run.js";
run({
  webServerPort: 8080,
  projectId: "test",
  tilesetImages: {
    grass: "assets/grass.png",
    water: "assets/water.png"
  },
  tilemapJsonPath: "assets/tilemap.json",
});
