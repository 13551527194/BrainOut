import GameConfig from "./GameConfig";
import Game from "./core/Game";
import GM from "./main/GM";
import HomeLoading from "./main/HomeLoading";
import InitView from "./main/InitView";

class Main {
	constructor() {
		//根据IDE设置初始化引擎
		 Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		Laya.stage.bgColor = "#ffffff";
		Laya.stage.frameRate = Laya.Stage.FRAME_SLOW;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
		if (GameConfig.stat) Laya.Stat.show();


		console.log("代码版本",GM.codeVer);
		console.log("资源版本",GM.resVer);
		if (Laya.Browser.window.wx) {
			Laya.URL.basePath = "https://img.kuwan511.com/brainOut/" + GM.resVer + "/";
			Laya.MiniAdpter.nativefiles = GM.nativefiles;
		}

		Game.init("res/sounds/");
		GM.startGame();
	}
}
//激活启动类
new Main();
