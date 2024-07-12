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
  terrainMap: { [cord: string]: string }; // { row, col } -> terrainId
  objects: {
    x: number;
    y: number;
    zIndex: number;
    spritesheet: string;
    frame: string;
  }[];
}
