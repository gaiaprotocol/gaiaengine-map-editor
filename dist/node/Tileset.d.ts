import { Node } from "@gaiaengine/2d";
export default class Tileset extends Node {
    private _tileSize;
    private grid;
    private hoverTile;
    private selectedTile;
    private touchstartX;
    private touchstartY;
    constructor(src: string, _tileSize: number, onTileSelect: (row: number, col: number) => void);
    set tileSize(tileSize: number);
}
//# sourceMappingURL=Tileset.d.ts.map