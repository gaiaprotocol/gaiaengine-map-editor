import Config from "./Config.js";
import FileServer from "./common/webserver/FileServer.js";

export default async function run(config: Config) {
  new FileServer(config, async (ctx) => {
  });
}
