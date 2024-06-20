import { FileServer, FileUtil, HttpContext } from "@common-module/server";
import { TilemapData } from "@gaiaengine/2d";
import Config from "./Config.js";

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
      const data: TilemapData = await ctx.readData();
      await FileUtil.write("assets/tilemap.json", JSON.stringify(data));
      await ctx.apiResponse();
    }

    if (ctx.uri.startsWith("api/load-assets/")) {
      const filePath = ctx.uri.replace("api/load-assets/", "");
      await ctx.response({ content: await FileUtil.readBuffer(filePath) });
    }
  });
}
