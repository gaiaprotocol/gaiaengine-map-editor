import { WebServerOptions } from "@common-module/server";

export default interface Config extends WebServerOptions {
  tilesetImagePath: string;
  tilesetJsonPath: string;
  tilemapJsonPath: string;
}
