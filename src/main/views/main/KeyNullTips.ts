import { ui } from "../../../ui/layaMaxUI";
import GM from "../../GM";
import AdType from "./AdType";
import LogType from "../../LogType";

export default class KeyNullTips extends ui.keyTipsUI {
    
    constructor() { 
        super(); 
        this.nextAdBtn.clickHandler = new Laya.Handler(this,this.onPlay);
        this.cha.on(Laya.Event.CLICK,this,this.onClose);
        GM.imgEffect.addEffect(this.cha);
        this.on(Laya.Event.DISPLAY,this,this.onDis);
    }

    private onDis():void
    {
        this.cha.alpha = 0;
        setTimeout(() => {
            Laya.Tween.to(this.cha,{alpha:1},500);
        }, 600);

        GM.sysLog(LogType.open_key_null);
    }

    private onPlay():void
    {
        GM.platform.playAd("",AdType.nullKey);
        this.removeSelf();
        GM.sysLog(LogType.key_null_ad_play);
    }

    private onClose():void
    {
        GM.sysLog(LogType.close_key_null);
        this.removeSelf();
    }
}