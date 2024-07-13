import { DomNode, el, FileTree, FileTreeNodeData } from "@common-module/app";
import { SpritesheetData } from "pixi.js";
import FileTreeIcon from "../FileTreeIcon.js";

export default class TerrainEditor extends DomNode {
  constructor(
    spritesheets: { [id: string]: { src: string; atlas: SpritesheetData } },
    terrains: {
      [id: string]: {
        [direction: string]: {
          spritesheet: string;
          frame: string;
          zIndex: number;
        }[];
      };
    },
  ) {
    super(".terrain-editor");

    const fileTreeData: FileTreeNodeData[] = [];
    for (const terrainId in terrains) {
      const terrain = terrains[terrainId];
      fileTreeData.push({
        icon: new FileTreeIcon(
          spritesheets[terrain.center[0].spritesheet].src,
          spritesheets[terrain.center[0].spritesheet].atlas,
          terrain.center[0].frame,
        ),
        name: terrainId,
      });
    }

    this.append(
      el(
        ".terrain-list",
        new FileTree("terrain-editor-file-tree", fileTreeData),
      ),
    );
  }

  public show() {
    this.deleteClass("hidden");
  }

  public hide() {
    this.addClass("hidden");
  }
}
