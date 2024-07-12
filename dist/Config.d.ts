import { WebServerOptions } from "@common-module/server";
export default interface Config extends WebServerOptions {
    projectId: string;
    tileSize: number;
    spritesheets: {
        [id: string]: {
            src: string;
            atlas: string;
        };
    };
    mapJsonPath: string;
}
//# sourceMappingURL=Config.d.ts.map