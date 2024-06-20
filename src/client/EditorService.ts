import { TilemapData } from "@gaiaengine/2d";

class EditorService {
  public async saveTilemap(tilemap: TilemapData): Promise<void> {
    const response = await fetch("/api/save-tilemap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tilemap),
    });
    if (!response.ok) {
      throw new Error(`Failed to save tilemap: ${response.statusText}`);
    }
  }
}

export default new EditorService();
