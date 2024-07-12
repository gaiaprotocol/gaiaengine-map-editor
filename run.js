import run from "./dist/run.js";
run({
  webServerPort: 8080,
  projectId: "test",

  /*tilesetImages: {
    grass: "assets/grass.png",
    water: "assets/water.png"
  },
  tilemapJsonPath: "assets/tilemap.json",*/

  tileSize: 256,
  spritesheets: {
    "spritesheet-with-alpha": {
      src: "assets/gaiawar/spritesheet-with-alpha.png",
      atlas: "assets/gaiawar/spritesheet-with-alpha.json",
    },
    "spritesheet-without-alpha": {
      src: "assets/gaiawar/spritesheet-without-alpha.jpg",
      atlas: "assets/gaiawar/spritesheet-without-alpha.json",
    },
  },
  mapJsonPath: "assets/gaiawar/map.json",
});
