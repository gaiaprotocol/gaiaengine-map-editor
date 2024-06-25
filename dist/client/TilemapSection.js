import { DomNode, el, Input, Store } from "@common-module/app";
import { Screen } from "@gaiaengine/2d";
import InfiniteGrid from "../node/InfiniteGrid.js";
import TileAreaDisplay from "../node/TileAreaDisplay.js";
import EditorService from "./EditorService.js";
export default class TilemapSection extends DomNode {
    projectId;
    tilemapData;
    transformStore;
    x = 0;
    y = 0;
    zoom = 1;
    dragging = false;
    dragX = 0;
    dragY = 0;
    tileSizeInput;
    screen;
    xInput;
    yInput;
    zoomInput;
    grid;
    hoverTile;
    constructor(projectId, tilemapData) {
        super("section.tilemap");
        this.projectId = projectId;
        this.tilemapData = tilemapData;
        this.addAllowedEvents("tileSizeChange");
        this.transformStore = new Store(`tilemap-transform-${this.projectId}`);
        this.x = this.transformStore.get("x") ?? 0;
        this.y = this.transformStore.get("y") ?? 0;
        this.zoom = this.transformStore.get("zoom") ?? 1;
        this.append(el("header", this.tileSizeInput = new Input({
            label: "Tile Size",
            value: tilemapData.tileSize.toString(),
        })), el("main", this.screen = new Screen(0, 0, this.grid = new InfiniteGrid(0, 0, tilemapData.tileSize))), el("footer", this.xInput = new Input({ label: "X", value: this.x.toString() }), this.yInput = new Input({ label: "Y", value: this.y.toString() }), this.zoomInput = new Input({
            label: "Zoom",
            value: this.zoom.toString(),
        })));
        this.screen.backgroundColor = 0xbfbfbf;
        this.tileSizeInput.on("change", () => {
            const tileSize = parseInt(this.tileSizeInput.value);
            tilemapData.tileSize = tileSize;
            this.tileSizeInput.value = tileSize.toString();
            EditorService.saveTilemap(this.tilemapData);
            this.grid.tileSize = tileSize;
            this.emit("tileSizeChange", tileSize);
        });
        this.screen.camera.setPosition(-this.x, -this.y);
        this.screen.root.scale = this.zoom;
        this.screen.onDom("mousedown", (event) => {
            this.dragging = true;
            this.dragX = event.clientX;
            this.dragY = event.clientY;
        });
        this.screen.onDom("mousemove", (event) => {
            if (this.dragging) {
                this.x += event.clientX - this.dragX;
                this.y += event.clientY - this.dragY;
                this.dragX = event.clientX;
                this.dragY = event.clientY;
                this.xInput.value = this.x.toString();
                this.yInput.value = this.y.toString();
                this.screen.camera.setPosition(-this.x, -this.y);
                this.transformStore.set("x", this.x);
                this.transformStore.set("y", this.y);
            }
            this.touchMoveHandler(event);
        });
        this.screen.onDom("mouseup", () => this.dragging = false);
        this.screen.onDom("touchmove", this.touchMoveHandler);
        this.screen.onDom("wheel", (event) => {
            event.preventDefault();
            this.zoom += event.deltaY / 100;
            if (this.zoom < 0.1)
                this.zoom = 0.1;
            if (this.zoom > 10)
                this.zoom = 10;
            this.screen.root.scale = this.zoom;
            this.zoomInput.value = this.zoom.toString();
            this.transformStore.set("zoom", this.zoom);
        });
        this.xInput.on("change", () => {
            this.x = parseFloat(this.xInput.value);
            this.screen.camera.setPosition(-this.x, -this.y);
            this.transformStore.set("x", this.x);
        });
        this.yInput.on("change", () => {
            this.y = parseFloat(this.yInput.value);
            this.screen.camera.setPosition(-this.x, -this.y);
            this.transformStore.set("y", this.y);
        });
        this.zoomInput.on("change", () => {
            this.zoom = parseFloat(this.zoomInput.value);
            this.screen.root.scale = this.zoom;
            this.transformStore.set("zoom", this.zoom);
        });
        this.on("visible", () => this.resizeScreen());
        this.onWindow("resize", () => this.resizeScreen());
    }
    touchMoveHandler = (e) => {
        const screenRect = this.screen.rect;
        const rx = ((e instanceof TouchEvent ? e.touches[0].clientX : e.clientX) -
            screenRect.x - this.screen.width / 2 + this.screen.camera.x) /
            this.screen.root.scaleX;
        const ry = ((e instanceof TouchEvent ? e.touches[0].clientY : e.clientY) -
            screenRect.y - this.screen.height / 2 + this.screen.camera.y) /
            this.screen.root.scaleY;
        const row = Math.floor((ry + this.tilemapData.tileSize / 2) / this.tilemapData.tileSize);
        const col = Math.floor((rx + this.tilemapData.tileSize / 2) / this.tilemapData.tileSize);
        if (this.hoverTile && this.hoverTile.row === row &&
            this.hoverTile.col === col)
            return;
        this.hoverTile?.delete();
        this.hoverTile = new TileAreaDisplay(this.tilemapData.tileSize, row, col)
            .appendTo(this.screen.root);
    };
    resizeScreen() {
        const rect = this.screen.parent.rect;
        this.screen.resize(rect.width, rect.height);
    }
}
//# sourceMappingURL=TilemapSection.js.map