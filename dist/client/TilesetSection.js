import { DomNode, el, Input, Store, Tabs } from "@common-module/app";
import { Screen } from "@gaiaengine/2d";
import Tileset from "../node/Tileset.js";
export default class TilesetSection extends DomNode {
    projectId;
    tilesets;
    transformStore;
    tilesetTransforms = {};
    dragging = false;
    dragX = 0;
    dragY = 0;
    tabs;
    screen;
    xInput;
    yInput;
    zoomInput;
    tileset;
    getTilesetTransform(key) {
        return this.tilesetTransforms[key] ?? { x: 0, y: 0, zoom: 1 };
    }
    constructor(projectId, tileSize, tilesets) {
        super("section.tileset");
        this.projectId = projectId;
        this.tilesets = tilesets;
        this.addAllowedEvents("tileSelected");
        this.transformStore = new Store(`tileset-transform-${this.projectId}`);
        for (const key in this.tilesets) {
            const transform = this.transformStore.get(key);
            if (transform)
                this.tilesetTransforms[key] = transform;
        }
        this.append(this.tabs = new Tabs(`tileset-tabs-${projectId}`, Object.keys(tilesets).map((key) => ({
            id: key,
            label: key,
        }))), el("main", this.screen = new Screen(0, 0)), el("footer", this.xInput = new Input({ label: "X" }), this.yInput = new Input({ label: "Y" }), this.zoomInput = new Input({ label: "Zoom" })));
        this.screen.backgroundColor = 0xbfbfbf;
        this.tabs.on("select", (id) => {
            this.tileset = new Tileset(`api/load-assets/${tilesets[id]}`, tileSize, (row, col) => this.emit("tileSelected", id, row, col));
            this.screen.root.empty().append(this.tileset);
            const transform = this.getTilesetTransform(id);
            this.xInput.value = transform.x.toString();
            this.yInput.value = transform.y.toString();
            this.zoomInput.value = transform.zoom.toString();
            this.screen.camera.setPosition(-transform.x, -transform.y);
            this.screen.root.scale = transform.zoom;
        }).init();
        this.screen.onDom("mousedown", (event) => {
            this.dragging = true;
            this.dragX = event.clientX;
            this.dragY = event.clientY;
        });
        this.screen.onDom("mousemove", (event) => {
            if (this.dragging) {
                const transform = this.getTilesetTransform(this.tabs.currentTab);
                transform.x += event.clientX - this.dragX;
                transform.y += event.clientY - this.dragY;
                this.dragX = event.clientX;
                this.dragY = event.clientY;
                this.xInput.value = transform.x.toString();
                this.yInput.value = transform.y.toString();
                this.screen.camera.setPosition(-transform.x, -transform.y);
                this.transformStore.set(this.tabs.currentTab, transform);
            }
        });
        this.screen.onDom("mouseup", () => this.dragging = false);
        this.screen.onDom("wheel", (event) => {
            event.preventDefault();
            const transform = this.getTilesetTransform(this.tabs.currentTab);
            transform.zoom += event.deltaY / 100;
            if (transform.zoom < 0.1)
                transform.zoom = 0.1;
            if (transform.zoom > 10)
                transform.zoom = 10;
            this.screen.root.scale = transform.zoom;
            this.zoomInput.value = transform.zoom.toString();
            this.transformStore.set(this.tabs.currentTab, transform);
        });
        this.xInput.on("change", () => {
            const transform = this.getTilesetTransform(this.tabs.currentTab);
            transform.x = parseFloat(this.xInput.value);
            this.screen.camera.setPosition(-transform.x, -transform.y);
            this.transformStore.set(this.tabs.currentTab, transform);
        });
        this.yInput.on("change", () => {
            const transform = this.getTilesetTransform(this.tabs.currentTab);
            transform.y = parseFloat(this.yInput.value);
            this.screen.camera.setPosition(-transform.x, -transform.y);
            this.transformStore.set(this.tabs.currentTab, transform);
        });
        this.zoomInput.on("change", () => {
            const transform = this.getTilesetTransform(this.tabs.currentTab);
            transform.zoom = parseFloat(this.zoomInput.value);
            this.screen.root.scale = transform.zoom;
            this.transformStore.set(this.tabs.currentTab, transform);
        });
        this.on("visible", () => this.resizeScreen());
        this.onWindow("resize", () => this.resizeScreen());
    }
    resizeScreen() {
        const rect = this.screen.parent.rect;
        this.screen.resize(rect.width, rect.height);
    }
    set tileSize(tileSize) {
        this.tileset.tileSize = tileSize;
    }
}
//# sourceMappingURL=TilesetSection.js.map