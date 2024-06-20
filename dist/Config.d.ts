import { WebServerOptions } from "@common-module/server";
export default interface Config extends WebServerOptions {
    projectId: string;
    tilesetImages: {
        [key: string]: string;
    };
    tilemapJsonPath: string;
}
//# sourceMappingURL=Config.d.ts.map