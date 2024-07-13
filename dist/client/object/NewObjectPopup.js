import { Button, ButtonType, el, MaterialIcon, Popup, } from "@common-module/app";
export default class NewObjectPopup extends Popup {
    constructor() {
        super(".new-object-popup", { barrierDismissible: true });
        this.header.append(el("h1", "New Object"), new Button({
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
//# sourceMappingURL=NewObjectPopup.js.map