export default interface MapData {
  terrains: {
    [id: string]: {
      [direction: string]: {
        spritesheet: string;
        frame: string;
        zIndex: number;
      }[];
    };
  };
  objects: {
    [id: string]: {
      spritesheet: string;
      frame: string;
      zIndex: number;
    };
  };
  terrainMap: { [cord: string]: string }; // { row, col } -> terrainId
  mapObjects: { x: number; y: number; object: string }[];
}
