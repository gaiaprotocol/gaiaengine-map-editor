import { DomNode, el, Input, Store, Tabs } from "@common-module/app";
import { Image, Screen } from "@gaiaengine/2d";
import FixedGrid from "../node/FixedGrid.js";

interface Transform {
  x: number;
  y: number;
  zoom: number;
}

export default class TilesetSection extends DomNode {
  private transformStore: Store;
  private tilesetTransforms: { [key: string]: Transform } = {};

  private dragging = false;
  private dragX = 0;
  private dragY = 0;

  private tabs: Tabs;
  private screen: Screen;
  private xInput: Input;
  private yInput: Input;
  private zoomInput: Input;

  private grid: FixedGrid | undefined;

  private getTilesetTransform(key: string) {
    return this.tilesetTransforms[key] ?? { x: 0, y: 0, zoom: 1 };
  }

  constructor(
    private projectId: string,
    tileSize: number,
    private tilesets: { [key: string]: string },
  ) {
    super("section.tileset");
    this.transformStore = new Store(`tileset-transform-${this.projectId}`);
    for (const key in this.tilesets) {
      const transform = this.transformStore.get<Transform>(key);
      if (transform) this.tilesetTransforms[key] = transform;
    }

    this.append(
      this.tabs = new Tabs(
        `tileset-tabs-${projectId}`,
        Object.keys(tilesets).map((key) => ({
          id: key,
          label: key,
        })),
      ),
      el("main", this.screen = new Screen(0, 0)),
      el(
        "footer",
        this.xInput = new Input({ label: "X" }),
        this.yInput = new Input({ label: "Y" }),
        this.zoomInput = new Input({ label: "Zoom" }),
      ),
    );

    this.screen.backgroundColor = 0xbfbfbf;

    this.tabs.on("select", (id) => {
      this.screen.root.empty();
      const image = new Image(0, 0, `api/load-assets/${tilesets[id]}`, () => {
        this.screen.root.append(
          this.grid = new FixedGrid(0, 0, tileSize, image.width, image.height),
        );
      });
      this.screen.root.append(image);
      const transform = this.getTilesetTransform(id);
      this.xInput.value = transform.x.toString();
      this.yInput.value = transform.y.toString();
      this.zoomInput.value = transform.zoom.toString();
      this.screen.camera.setPosition(-transform.x, -transform.y);
      this.screen.root.scale = transform.zoom;
    }).init();

    this.screen.onDom("mousedown", (event: MouseEvent) => {
      this.dragging = true;
      this.dragX = event.clientX;
      this.dragY = event.clientY;
    });

    this.screen.onDom("mousemove", (event: MouseEvent) => {
      if (this.dragging) {
        const transform = this.getTilesetTransform(this.tabs.currentTab!);
        transform.x += event.clientX - this.dragX;
        transform.y += event.clientY - this.dragY;
        this.dragX = event.clientX;
        this.dragY = event.clientY;
        this.xInput.value = transform.x.toString();
        this.yInput.value = transform.y.toString();
        this.screen.camera.setPosition(-transform.x, -transform.y);
        this.transformStore.set(this.tabs.currentTab!, transform);
      }
    });

    this.screen.onDom("mouseup", () => this.dragging = false);

    this.screen.onDom("wheel", (event: WheelEvent) => {
      event.preventDefault();
      const transform = this.getTilesetTransform(this.tabs.currentTab!);
      transform.zoom += event.deltaY / 100;
      if (transform.zoom < 0.1) transform.zoom = 0.1;
      if (transform.zoom > 10) transform.zoom = 10;
      this.screen.root.scale = transform.zoom;
      this.zoomInput.value = transform.zoom.toString();
      this.transformStore.set(this.tabs.currentTab!, transform);
    });

    this.xInput.on("change", () => {
      const transform = this.getTilesetTransform(this.tabs.currentTab!);
      transform.x = parseFloat(this.xInput.value);
      this.screen.camera.setPosition(-transform.x, -transform.y);
      this.transformStore.set(this.tabs.currentTab!, transform);
    });

    this.yInput.on("change", () => {
      const transform = this.getTilesetTransform(this.tabs.currentTab!);
      transform.y = parseFloat(this.yInput.value);
      this.screen.camera.setPosition(-transform.x, -transform.y);
      this.transformStore.set(this.tabs.currentTab!, transform);
    });

    this.zoomInput.on("change", () => {
      const transform = this.getTilesetTransform(this.tabs.currentTab!);
      transform.zoom = parseFloat(this.zoomInput.value);
      this.screen.root.scale = transform.zoom;
      this.transformStore.set(this.tabs.currentTab!, transform);
    });

    this.on("visible", () => this.resizeScreen());
    this.onWindow("resize", () => this.resizeScreen());
  }

  private resizeScreen() {
    const rect = this.screen.parent!.rect;
    this.screen.resize(rect.width, rect.height);
  }

  public set tileSize(tileSize: number) {
    if (this.grid) this.grid.tileSize = tileSize;
  }
}
