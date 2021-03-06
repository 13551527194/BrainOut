import { ui } from "../../ui/layaMaxUI";
import BaseLevel from "./BaseLevel";
import GM from "../GM";

export default class Level_7 extends BaseLevel {
    private ui: ui.level7UI;
    private posList: number[][] = [];

    constructor() { super(); }

    onInit(): void {
        if (this.isInit) {
            return;
        }
        this.ui = new ui.level7UI();
        this.addChild(this.ui);
        this.isInit = true;

        for (let i = 0; i < 4; i++)  {
            let img: Laya.Image = this.ui["item" + i];
            this.addEvent(img, null, true);
            this.posList.push([img.x, img.y]);
        }
        this.refresh();
    }

    refresh(): void {
        super.refresh();
        for (let i = 0; i < 4; i++)  {
            let img: Laya.Image = this.ui["item" + i];
            img.pos(this.posList[i][0], this.posList[i][1]);
            img.scale(1, 1);
            img.visible = true;
        }
    }

    private onClick(img): void  {
        let count: number = 0;
        for (let i = 0; i < 4; i++)  {
            let timg: Laya.Image = this.ui["item" + i];
            if (timg.visible)  {
                count++;
            }
        }

        this.setAnswer(img, count == 1);
    }

    private _downPos: Laya.Point = new Laya.Point();
    onDown(sprite: Laya.Sprite): void  {
        this._downPos.x = Laya.stage.mouseX;
        this._downPos.y = Laya.stage.mouseY;

        this.ui.addChild(sprite);
        sprite.startDrag(new Laya.Rectangle(this.ui.box.x, this.ui.box.y, this.ui.box.width, this.ui.box.height));
    }

    onUp(sprite: Laya.Sprite): void  {
        super.onUp(sprite);
        let isHit: boolean = false;
        for (let i = 0; i < 4; i++)  {
            let img: Laya.Image = this.ui["item" + i];
            if (img.visible && img != sprite)  {
                if (GM.hit(sprite, img))  {
                    if (img.width > sprite.width)  {
                        sprite.visible = false;
                        Laya.Tween.to(img, { scaleX: img.scaleX + 0.1, scaleY: img.scaleY + 0.1 }, 300, Laya.Ease.backOut);
                    }
                    else  {
                        img.visible = false;
                        Laya.Tween.to(sprite, { scaleX: sprite.scaleX + 0.1, scaleY: sprite.scaleY + 0.1 }, 300, Laya.Ease.backOut);
                    }
                    isHit = true;
                }
            }
        }
        if (!isHit)  {
            this.onClick(sprite);
        }
    }
}