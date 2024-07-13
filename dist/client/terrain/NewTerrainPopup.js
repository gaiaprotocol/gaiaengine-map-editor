import { Button, ButtonType, el, MaterialIcon, Popup, } from "@common-module/app";
export default class NewTerrainPopup extends Popup {
    constructor() {
        super(".new-terrain-popup", { barrierDismissible: true });
        this.header.append(el("h1", "New Terrain"), new Button({
            tag: ".close",
            type: ButtonType.Circle,
            icon: new MaterialIcon("close"),
            click: () => this.delete(),
        }));
        this.main.append();
        this.footer.append(new Button({
            tag: ".close",
            title: "Close",
            click: () => this.delete(),
        }));
    }
}
//# sourceMappingURL=NewTerrainPopup.js.map