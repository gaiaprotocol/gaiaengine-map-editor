import FileServer from "./common/webserver/FileServer.js";
export default async function run(config) {
    new FileServer(config, async (ctx) => {
    });
}
//# sourceMappingURL=run.js.map