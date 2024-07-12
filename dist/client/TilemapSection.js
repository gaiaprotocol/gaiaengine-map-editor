import { DomNode, el, Input, Store } from "@common-module/app";
import { RectTerrainMap, Screen } from "@gaiaengine/2d";
import { Graphics } from "pixi.js";
import EditorService from "./EditorService.js";
import InfiniteGrid from "./node/InfiniteGrid.js";
export default class TilemapSection extends DomNode {
    projectId;
    tilesets;
    tilemapData;
    transformStore;
    x = 0;
    y = 0;
    zoom = 1;
    dragging = false;
    dragX = 0;
    dragY = 0;
    touchstartX = 0;
    touchstartY = 0;
    tileSizeInput;
    screen;
    xInput;
    yInput;
    zoomInput;
    map;
    grid;
    hoverTile;
    selectedTile;
    constructor(projectId, tilesets, tilemapData) {
        super("section.tilemap");
        this.projectId = projectId;
        this.tilesets = tilesets;
        this.tilemapData = tilemapData;
        this.addAllowedEvents("tileSizeChange");
        this.transformStore = new Store(`tilemap-transform-${this.projectId}`);
        this.x = this.transformStore.get("x") ?? 0;
        this.y = this.transformStore.get("y") ?? 0;
        this.zoom = this.transformStore.get("zoom") ?? 1;
        const tilemapTilesets = {};
        for (const key in this.tilesets) {
            tilemapTilesets[key] = `api/load-assets/${this.tilesets[key]}`;
        }
        this.append(el("header", this.tileSizeInput = new Input({
            label: "Tile Size",
            value: this.tilemapData.tileSize.toString(),
        })), el("main", this.screen = new Screen(0, 0, this.map = new RectTerrainMap(this.tilemapData.tileSize, this.tilemapData.spritesheets, this.tilemapData.terrains, this.tilemapData.terrainMap, this.tilemapData.objects), this.grid = new InfiniteGrid(0, 0, this.tilemapData.tileSize))), el("footer", this.xInput = new Input({ label: "X", value: this.x.toString() }), this.yInput = new Input({ label: "Y", value: this.y.toString() }), this.zoomInput = new Input({
            label: "Zoom",
            value: this.zoom.toString(),
        })));
        this.screen.backgroundColor = 0xbfbfbf;
        const centerGraphics = new Graphics();
        centerGraphics.rect(-1, -1, 2, 2).fill(0xff0000);
        centerGraphics.zIndex = 1000;
        this.screen.root.container.addChild(centerGraphics);
        this.tileSizeInput.on("change", () => {
            const tileSize = parseInt(this.tileSizeInput.value);
            this.tilemapData.tileSize = tileSize;
            this.tileSizeInput.value = tileSize.toString();
            EditorService.saveTilemap(this.tilemapData);
            this.grid.tileSize = tileSize;
            this.emit("tileSizeChange", tileSize);
        });
        this.screen.camera.setPosition(-this.x, -this.y);
        this.screen.camera.scale = this.zoom;
        this.screen.onDom("mousedown", (event) => {
            this.dragging = true;
            this.dragX = event.clientX;
            this.dragY = event.clientY;
            this.touchstartX = event.clientX;
            this.touchstartY = event.clientY;
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
        this.screen.onDom("mouseup", (event) => {
            this.dragging = false;
            if (this.selectedTile &&
                Math.abs(event.clientX - this.touchstartX) < 5 &&
                Math.abs(event.clientY - this.touchstartY) < 5) {
                const { row, col } = this.getRowColFromEvent(event);
                EditorService.saveTilemap(this.tilemapData);
            }
        });
        this.screen.onDom("touchmove", this.touchMoveHandler);
        this.screen.onDom("wheel", (event) => {
            event.preventDefault();
            this.zoom += event.deltaY / 100;
            if (this.zoom < 0.1)
                this.zoom = 0.1;
            if (this.zoom > 10)
                this.zoom = 10;
            this.screen.camera.scale = this.zoom;
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
            this.screen.camera.scale = this.zoom;
            this.transformStore.set("zoom", this.zoom);
        });
        this.on("visible", () => this.resizeScreen());
        this.onWindow("resize", () => this.resizeScreen());
    }
    getRowColFromEvent(e) {
        const screenRect = this.screen.rect;
        const rx = ((e instanceof TouchEvent ? e.touches[0].clientX : e.clientX) -
            screenRect.x - this.screen.width / 2 + this.screen.camera.x) /
            this.screen.camera.scale;
        const ry = ((e instanceof TouchEvent ? e.touches[0].clientY : e.clientY) -
            screenRect.y - this.screen.height / 2 + this.screen.camera.y) /
            this.screen.camera.scale;
        const row = Math.floor((ry + this.tilemapData.tileSize / 2) / this.tilemapData.tileSize);
        const col = Math.floor((rx + this.tilemapData.tileSize / 2) / this.tilemapData.tileSize);
        return { row, col };
    }
    touchMoveHandler = (event) => {
        const { row, col } = this.getRowColFromEvent(event);
        if (!this.selectedTile || (this.hoverTile && this.hoverTile.row === row &&
            this.hoverTile.col === col))
            return;
        this.hoverTile?.delete();
    };
    resizeScreen() {
        const rect = this.screen.parent.rect;
        this.screen.resize(rect.width, rect.height);
    }
    setTile(tilesetId, row, col) {
        this.selectedTile = { tilesetId, row, col };
    }
}
//# sourceMappingURL=TilemapSection.js.map