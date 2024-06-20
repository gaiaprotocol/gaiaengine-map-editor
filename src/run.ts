import { FileServer } from "@common-module/server";
import Config from "./Config.js";

class EditorServer extends FileServer {
  constructor(private config: Config) {
    super(config);
  }

  protected modifyIndexFileContent(content: string): string {
    return content.replace(
      "<!-- CONFIG HERE -->",
      `<script>window.config = ${JSON.stringify(this.config)};</script>`,
    );
  }
}

export default async function run(config: Config) {
  new EditorServer(config);
}
