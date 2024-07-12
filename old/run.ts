import { FileServer, FileUtil, HttpContext } from "@common-module/server";
import Config from "./Config.js";
import MapData from "./client/MapData.js";

class EditorServer extends FileServer {
  constructor(
    private config: Config,
    listener?: (context: HttpContext) => Promise<void>,
  ) {
    super(config, listener);
  }

  protected modifyIndexFileContent(content: string): string {
    return content.replace(
      "<!-- CONFIG HERE -->",
      `<script>window.config = ${JSON.stringify(this.config)};</script>`,
    );
  }
}

export default async function run(config: Config) {
  new EditorServer(config, async (ctx) => {
    if (ctx.uri === "api/save-tilemap") {
      const data: MapData = await ctx.readData();
      await FileUtil.write(
        config.mapJsonPath,
        JSON.stringify(data, null, 2),
      );
      await ctx.apiResponse();
    }

    if (ctx.uri.startsWith("api/load-assets/")) {
      const filePath = ctx.uri.replace("api/load-assets/", "");
      await ctx.response({ content: await FileUtil.readBuffer(filePath) });
    }
  });
}
