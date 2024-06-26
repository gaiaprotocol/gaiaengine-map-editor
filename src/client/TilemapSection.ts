import { DomNode, el, Input, Store } from "@common-module/app";
import { Screen, Tilemap, TilemapData } from "@gaiaengine/2d";
import { Graphics } from "pixi.js";
import HoverTileDisplay from "../node/HoverTileDisplay.js";
import InfiniteGrid from "../node/InfiniteGrid.js";
import EditorService from "./EditorService.js";

export default class TilemapSection extends DomNode {
  private transformStore: Store;
  private x = 0;
  private y = 0;
  private zoom = 1;

  private dragging = false;
  private dragX = 0;
  private dragY = 0;
  private touchstartX = 0;
  private touchstartY = 0;

  private tileSizeInput: Input;
  private screen: Screen;
  private xInput: Input;
  private yInput: Input;
  private zoomInput: Input;

  private tilemap: Tilemap;
  private grid: InfiniteGrid;
  private hoverTile: HoverTileDisplay | undefined;

  private selectedTile:
    | { key: string; row: number; col: number }
    | undefined;

  constructor(
    private projectId: string,
    private tilesets: { [key: string]: string },
    private tilemapData: TilemapData,
  ) {
    super("section.tilemap");
    this.addAllowedEvents("tileSizeChange");

    this.transformStore = new Store(`tilemap-transform-${this.projectId}`);
    this.x = this.transformStore.get("x") ?? 0;
    this.y = this.transformStore.get("y") ?? 0;
    this.zoom = this.transformStore.get("zoom") ?? 1;

    const tilemapTilesets: { [key: string]: string } = {};
    for (const key in this.tilesets) {
      tilemapTilesets[key] = `api/load-assets/${this.tilesets[key]}`;
    }

    this.append(
      el(
        "header",
        this.tileSizeInput = new Input({
          label: "Tile Size",
          value: this.tilemapData.tileSize.toString(),
        }),
      ),
      el(
        "main",
        this.screen = new Screen(
          0,
          0,
          this.tilemap = new Tilemap(
            0,
            0,
            tilemapTilesets,
            this.tilemapData,
          ),
          this.grid = new InfiniteGrid(0, 0, this.tilemapData.tileSize),
        ),
      ),
      el(
        "footer",
        this.xInput = new Input({ label: "X", value: this.x.toString() }),
        this.yInput = new Input({ label: "Y", value: this.y.toString() }),
        this.zoomInput = new Input({
          label: "Zoom",
          value: this.zoom.toString(),
        }),
      ),
    );

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
    this.screen.root.scale = this.zoom;

    this.screen.onDom("mousedown", (event: MouseEvent) => {
      this.dragging = true;
      this.dragX = event.clientX;
      this.dragY = event.clientY;
      this.touchstartX = event.clientX;
      this.touchstartY = event.clientY;
    });

    this.screen.onDom("mousemove", (event: MouseEvent) => {
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

    this.screen.onDom("mouseup", (event: MouseEvent) => {
      this.dragging = false;
      if (
        this.selectedTile &&
        Math.abs(event.clientX - this.touchstartX) < 5 &&
        Math.abs(event.clientY - this.touchstartY) < 5
      ) {
        const { row, col } = this.getRowColFromEvent(event);
        this.tilemap.addTile({
          row,
          col,
          tileset: this.selectedTile,
        });
        EditorService.saveTilemap(this.tilemapData);
      }
    });

    this.screen.onDom("touchmove", this.touchMoveHandler);

    this.screen.onDom("wheel", (event: WheelEvent) => {
      event.preventDefault();
      this.zoom += event.deltaY / 100;
      if (this.zoom < 0.1) this.zoom = 0.1;
      if (this.zoom > 10) this.zoom = 10;
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

  private getRowColFromEvent(e: TouchEvent | MouseEvent) {
    const screenRect = this.screen.rect;
    const rx = ((e instanceof TouchEvent ? e.touches[0].clientX : e.clientX) -
      screenRect.x - this.screen.width / 2 + this.screen.camera.x) /
      this.screen.root.scaleX;
    const ry = ((e instanceof TouchEvent ? e.touches[0].clientY : e.clientY) -
      screenRect.y - this.screen.height / 2 + this.screen.camera.y) /
      this.screen.root.scaleY;
    const row = Math.floor(
      (ry + this.tilemapData.tileSize / 2) / this.tilemapData.tileSize,
    );
    const col = Math.floor(
      (rx + this.tilemapData.tileSize / 2) / this.tilemapData.tileSize,
    );
    return { row, col };
  }

  private touchMoveHandler = (event: TouchEvent | MouseEvent) => {
    const { row, col } = this.getRowColFromEvent(event);
    if (
      !this.selectedTile || (
        this.hoverTile && this.hoverTile.row === row &&
        this.hoverTile.col === col
      )
    ) return;

    this.hoverTile?.delete();
    this.hoverTile = new HoverTileDisplay(
      this.tilemapData.tileSize,
      row,
      col,
      this.tilemap.getTileTexture(
        this.selectedTile.key,
        this.selectedTile.row,
        this.selectedTile.col,
      ),
    ).appendTo(this.screen.root);
  };

  private resizeScreen() {
    const rect = this.screen.parent!.rect;
    this.screen.resize(rect.width, rect.height);
  }

  public setTile(tilesetKey: string, row: number, col: number) {
    this.selectedTile = { key: tilesetKey, row, col };
  }
}
