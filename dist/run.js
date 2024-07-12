import { FileServer, FileUtil } from "@common-module/server";
class EditorServer extends FileServer {
    config;
    constructor(config, listener) {
        super(config, listener);
        this.config = config;
    }
    modifyIndexFileContent(content) {
        return content.replace("<!-- CONFIG HERE -->", `<script>window.config = ${JSON.stringify(this.config)};</script>`);
    }
}
export default async function run(config) {
    new EditorServer(config, async (ctx) => {
        if (ctx.uri === "api/save-tilemap") {
            const data = await ctx.readData();
            await FileUtil.write(config.mapJsonPath, JSON.stringify(data, null, 2));
            await ctx.apiResponse();
        }
        if (ctx.uri.startsWith("api/load-assets/")) {
            const filePath = ctx.uri.replace("api/load-assets/", "");
            await ctx.response({ content: await FileUtil.readBuffer(filePath) });
        }
    });
}
//# sourceMappingURL=run.js.map