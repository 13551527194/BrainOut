import { ui } from "../../ui/layaMaxUI";
import BaseLevel from "./BaseLevel";

export default class Level_3 extends BaseLevel{
    private ui: ui.level3UI;
    
    constructor() { super(); }

    onInit(): void {
        if (this.isInit) {
            return;
        }
        this.ui = new ui.level3UI();
        this.addChild(this.ui);
        this.isInit = true;
    }
}