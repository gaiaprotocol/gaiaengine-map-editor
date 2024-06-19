import { FileServer } from "@common-module/server";
import Config from "./Config.js";

export default async function run(config: Config) {
  new FileServer(config, async (ctx) => {
  });
}
