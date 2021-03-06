import { ui } from "../../ui/layaMaxUI";
import BaseLevel from "./BaseLevel";
import GM from "../GM";

export default class Level_72 extends BaseLevel {
    private ui: ui.level72UI;

    constructor() { super(); }

    onInit(): void {
        if (this.isInit) {
            return;
        }
        this.ui = new ui.level72UI();
        this.addChild(this.ui);
        this.isInit = true;

        for(let i = 0; i < 10; i++)
        {
            let btn = this.ui["btn" + i];
            btn.tag = i;
            this.addEvent(btn,this.onClick);
        }

        this.ui.shuzi

        this.ui.qingchu.clickHandler = new Laya.Handler(this,this.onClear2);
        this.ui.queding.clickHandler = new Laya.Handler(this,this.onSure);

        this.refresh();
    }

    private onClear2():void
    {
        this.refresh();
    }

    private onSure():void
    {
        if(this.ui.shuzi.text == "24")
        {
            setTimeout(() => {
                this.setAnswer(this.ui.rightBox,true);
            }, (300));
        }
        else
        {
            this.setAnswer(this.ui.rightBox,false);
            setTimeout(() => {
                this.refresh();
            }, 1000);
        }
        
    }

    private onClick(btn):void
    {
        if(this.ui.shuzi.text == "0")
        {
            this.ui.shuzi.text = "";
        }
        if(this.ui.shuzi.text.length < 4)
        {
            this.ui.shuzi.text += btn.tag + "";
        }
    }

    onDown(sprite: Laya.Sprite): void  {
        sprite.startDrag();
    }

    refresh(): void  {
        Laya.MouseManager.enabled = true;
        super.refresh();

        this.ui.shuzi.text = "0";
    }
}