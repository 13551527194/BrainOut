import MainView from "./main/MainView";
import { ViewID } from "./ViewID";
import Game from "../../core/Game";
import GM from "../GM";
import PlatformID from "../platforms/PlatformID";
import Session from "../sessions/Session";
import { DataKey } from "../sessions/DataKey";

export default class ViewManager {

    allView: any = {};
    showView(viewId: ViewID): void {
        let curView = this.allView[viewId];
        if (curView == null) {
            let VIEW = Laya.ClassUtils.getClass(viewId + "");
            if (VIEW) {
                this.allView[viewId] = new VIEW();
            }
        }
        curView = this.allView[viewId];
        Game.layerManager.viewLayer.removeChildren();
        Game.layerManager.viewLayer.addChild(curView);
        Game.layerManager.y = (Laya.stage.height - Laya.stage.designHeight) * 0.5;

        if (viewId == ViewID.main)  {
            GM.hideTTBanner();
        }
        else  {
            GM.showTTBanner();
        }
    }

    showView2(viewId: ViewID): void {
        let curView = this.allView[viewId];
        if (curView == null) {
            let VIEW = Laya.ClassUtils.getClass(viewId + "");
            if (VIEW) {
                this.allView[viewId] = new VIEW();
            }
        }
        curView = this.allView[viewId];

        Game.layerManager.faceLayer.addChild(curView);
        if (viewId == ViewID.setting || viewId == ViewID.signin) {
            curView.x = -750;
            Laya.Tween.to(curView, { x: 0 }, 300);
        }
        Game.layerManager.y = (Laya.stage.height - Laya.stage.designHeight) * 0.5;

        GM.showTTBanner();
    }

    closeView2(viewId: ViewID): void {
        let curView = this.allView[viewId];
        if (curView) {
            curView.x = 0;
            Laya.Tween.to(curView, { x: -750 }, 300);
        }
    }
}