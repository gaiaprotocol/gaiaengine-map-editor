import App from "./client/App.js";
const config = window.config;
const spritesheets = {};
for (const id in config.spritesheets) {
    const { src, atlas } = config.spritesheets[id];
    spritesheets[id] = {
        src,
        atlas: await fetch(`/api/load-assets/${atlas}`).then((response) => response.json()),
    };
}
const mapData = await fetch(`/api/load-assets/${config.mapJsonPath}`)
    .then((response) => response.json());
new App(spritesheets, mapData);
//# sourceMappingURL=client.js.map