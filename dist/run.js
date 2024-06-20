import { FileServer } from "@common-module/server";
class EditorServer extends FileServer {
    config;
    constructor(config) {
        super(config);
        this.config = config;
    }
    modifyIndexFileContent(content) {
        return content.replace("<!-- CONFIG HERE -->", `<script>window.config = ${JSON.stringify(this.config)};</script>`);
    }
}
export default async function run(config) {
    new EditorServer(config);
}
//# sourceMappingURL=run.js.map