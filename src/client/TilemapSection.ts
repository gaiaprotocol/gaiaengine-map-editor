import { DomNode, el, Input, Store } from "@common-module/app";
import { Image, Screen, TilemapData } from "@gaiaengine/2d";
import EditorService from "./EditorService.js";

export default class TilemapSection extends DomNode {
  private transformStore: Store;
  private x = 0;
  private y = 0;
  private zoom = 1;

  private dragging = false;
  private dragX = 0;
  private dragY = 0;

  private tileSizeInput: Input;
  private screen: Screen;
  private xInput: Input;
  private yInput: Input;
  private zoomInput: Input;

  constructor(private projectId: string, private tilemapData: TilemapData) {
    super("section.tilemap");

    this.transformStore = new Store(`tilemap-transform-${this.projectId}`);
    this.x = this.transformStore.get("x") ?? 0;
    this.y = this.transformStore.get("y") ?? 0;
    this.zoom = this.transformStore.get("zoom") ?? 1;

    this.append(
      el(
        "header",
        this.tileSizeInput = new Input({
          label: "Tile Size",
          value: "32",
        }),
      ),
      el(
        "main",
        this.screen = new Screen(
          0,
          0,
          new Image(0, 0, `api/load-assets/assets/grass.png`),
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

    this.tileSizeInput.on("change", async () => {
      const tileSize = parseInt(this.tileSizeInput.value);
      tilemapData.tileSize = tileSize;
      this.tileSizeInput.value = tileSize.toString();
      await EditorService.saveTilemap(this.tilemapData);
    });

    this.screen.camera.setPosition(-this.x, -this.y);
    this.screen.root.scale = this.zoom;

    this.screen.onDom("mousedown", (event: MouseEvent) => {
      this.dragging = true;
      this.dragX = event.clientX;
      this.dragY = event.clientY;
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
    });

    this.screen.onDom("mouseup", () => this.dragging = false);

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

  private resizeScreen() {
    const rect = this.screen.parent!.rect;
    this.screen.resize(rect.width, rect.height);
  }
}
