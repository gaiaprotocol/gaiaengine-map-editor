export default interface TilemapData {
    terrains: {
        [id: string]: {
            [direction: string]: {
                spritesheet: string;
                frame: string;
                zIndex: number;
            }[];
        };
    };
    terrainMap: {
        [cord: string]: string;
    };
    objects: {
        x: number;
        y: number;
        zIndex: number;
        spritesheet: string;
        frame: string;
    }[];
}
//# sourceMappingURL=TilemapData.d.ts.map