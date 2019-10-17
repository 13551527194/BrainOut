import { BasePlatform } from "./BasePlatform";
import GM from "../GM";

export default class WXPlatform extends BasePlatform {
    constructor() { super(); }

    private tag: number = 0;
    checkUpdate(): void {
        Laya.Browser.window.wx.setKeepScreenOn({
            keepScreenOn: true
        });

        if (Laya.Browser.window.wx.getUpdateManager) {
            console.log("基础库 1.9.90 开始支持，低版本需做兼容处理");
            const updateManager = Laya.Browser.window.wx.getUpdateManager();
            updateManager.onCheckForUpdate(function (result) {
                if (result.hasUpdate) {
                    console.log("有新版本");
                    updateManager.onUpdateReady(function () {
                        console.log("新的版本已经下载好");
                        Laya.Browser.window.wx.showModal({
                            title: '更新提示',
                            content: '新版本已经下载，是否重启？',
                            success: function (result) {
                                if (result.confirm) { // 点击确定，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate();
                                }
                            }
                        });
                    });
                    updateManager.onUpdateFailed(function () {
                        console.log("新的版本下载失败");
                        Laya.Browser.window.wx.showModal({
                            title: '已经有新版本了',
                            content: '新版本已经上线啦，请您删除当前小游戏，重新搜索打开'
                        });
                    });
                }
                else {
                    console.log("没有新版本");
                }
            });
        }
        else {
            console.log("有更新肯定要用户使用新版本，对不支持的低版本客户端提示");
            Laya.Browser.window.wx.showModal({
                title: '温馨提示',
                content: '当前微信版本过低，无法使用该应用，请升级到最新微信版本后重试。'
            });
        }
    }

    login(callback): void {
        Laya.Browser.window.wx.login(
            {
                success: (res) => {
                    if (res.code) {
                        callback && callback(res.code);
                    }
                }
            });
    }

    private userBtn;
    getUserInfo(callback): void  {
        if(this.userBtn)
        {
           return; 
        }
        this.userBtn = Laya.Browser.window.wx.createUserInfoButton(
            {
                type: 'text',
                text: '',
                style:
                    {
                        width: Laya.Browser.window.wx.getSystemInfoSync().windowWidth,
                        height: Laya.Browser.window.wx.getSystemInfoSync().windowHeight
                    }
            })
        this.userBtn.onTap((resButton) => {
            if (resButton.errMsg == "getUserInfo:ok") {
                //获取到用户信息
                GM.userHeadUrl = resButton.userInfo.avatarUrl;
                GM.userName = resButton.userInfo.nickName;
                this.filterEmoji();
                //清除微信授权按钮
                this.userBtn.destroy()
                callback && callback();
            }
            else {
                console.log("授权失败")
            }
        })
    }

    private wxAuthSetting() {
        console.log("wx.getSetting");
        Laya.Browser.window.wx.getSetting({
            success: (res) => {
                console.log(res.authSetting);
                var authSetting = res.authSetting;
                if (authSetting["scope.userInfo"]) {
                    console.log("已经授权");
                }
                else {
                    console.log("未授权");
                }
            }
        });
    }

    private filterEmoji() {
        var strArr = GM.userName.split(""),
            result = "",
            totalLen = 0;

        for (var idx = 0; idx < strArr.length; idx++) {
            // 超出长度,退出程序
            if (totalLen >= 16) break;
            var val = strArr[idx];
            // 英文,增加长度1
            if (/[a-zA-Z]/.test(val)) {
                totalLen = 1 + (+totalLen);
                result += val;
            }
            // 中文,增加长度2
            else if (/[\u4e00-\u9fa5]/.test(val)) {
                totalLen = 2 + (+totalLen);
                result += val;
            }
            // 遇到代理字符,将其转换为 "口", 不增加长度
            else if (/[\ud800-\udfff]/.test(val)) {
                // 代理对长度为2,
                if (/[\ud800-\udfff]/.test(strArr[idx + 1])) {
                    // 跳过下一个
                    idx++;
                }
                // 将代理对替换为 "口"
                result += "?";
            }
        }
        GM.userName = result;
        console.log("过滤之后", GM.userName);
    }

    onShare(callback): void {
        Laya.Browser.window.wx.shareAppMessage({
            title: "来吧，pk一下吧！",
            imageUrl: "https://img.kuwan511.com/arrowLegend/share.jpg",
            destWidth: 500,
            destHeight: 400
        });

        Laya.Browser.window.wx.onShow(res => {
            console.log("onShow", this.tag);
            if (this.tag == 1000) {
                Laya.Browser.window.wx.offShow();
                Laya.Browser.window.wx.offHide();
                this.tag = -1;
            }
        });

        Laya.Browser.window.wx.onHide(res => {
            this.tag = 1000;
            console.log("onHide");
        });
    }
}