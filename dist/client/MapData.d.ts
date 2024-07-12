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
    terrainMap: {
        [cord: string]: string;
    };
    mapObjects: {
        x: number;
        y: number;
        object: string;
    }[];
}
//# sourceMappingURL=MapData.d.ts.map