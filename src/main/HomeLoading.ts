import { ui } from "../ui/layaMaxUI";
import ZipLoader from "../core/utils/ZipLoader";
import Game from "../core/Game";
import SysTitles from "./sys/SysTitles";
import GM from "./GM";
import { ViewID } from "./views/ViewID";
import Session from "./sessions/Session";
import { DataKey } from "./sessions/DataKey";

export default class HomeLoading extends ui.loadingUI {
    constructor() { 
        super(); 
        this.on(Laya.Event.DISPLAY,this,this.onDis);
    }

    private onDis():void
    {
        this.off(Laya.Event.DISPLAY,this,this.onDis);
        this.dengjishuzi.value = "0";

        let arr:any[] = [{ url: "atlas/pubRes.atlas", type: Laya.Loader.ATLAS },{ url: "res/tables.zip", type: Laya.Loader.BUFFER }];
        Laya.loader.load(arr,Laya.Handler.create(this,this.onCom),new Laya.Handler(this,this.onProgress));

        GM.platform && GM.platform.showBanner();
    }

    private onProgress(value:number):void
	{
		value = value * 100;
		this.dengjishuzi.value = value.toFixed(0) +"%";
	}

    private onCom():void
    {
        ZipLoader.instance.zipFun(Laya.loader.getRes("res/tables.zip"), new Laya.Handler(this, this.zipFun));
        Laya.loader.clearRes("res/tables.zip");
    }

    private zipFun(arr: any[]):void
    {
        Game.tableManager.onParse(arr);

        GM.imgEffect.start();
        GM.viewManager.showView(ViewID.main);
        if(Session.gameData[DataKey.signinState] == 0)
        {
            GM.viewManager.showView2(ViewID.signin);
        }
        GM.playMusic("bg.mp3");
        this.destroy(true);
    }
}