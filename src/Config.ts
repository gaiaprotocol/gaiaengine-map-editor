import { WebServerOptions } from "@common-module/server";

export default interface Config extends WebServerOptions {
  tilesets: {
    imagePath: string;
    jsonPath: string;
  }[];
  tilemapJsonPath: string;
}
