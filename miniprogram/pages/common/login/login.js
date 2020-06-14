var app = getApp();

Page({
    data: {
        logo: "../../../public/images/logo.jpg"
    },
    onReady: function() {},
    bindGetUserInfo: function() {
        wx.login({
            success: function(e) {
                if (e.code) {
                    var t = e.code;
                    wx.getUserInfo({
                        success: function(e) {
                            var a = {};
                            a.encryptedData = e.encryptedData, a.iv = e.iv, a.code = t, a.m = "dawn_banana", 
                            console.log(a), app.util.request({
                                url: "entry/wxapp/Auth.login",
                                data: a,
                                cachetime: "5",
                                success: function(e) {
                                    0 == e.data.code && (wx.setStorage({
                                        key: "userinfo",
                                        data: e.data.data
                                    }), wx.navigateBack({
                                        delta: 1
                                    }));
                                }
                            });
                        }
                    });
                } else console.log("登录失败！" + e.errMsg);
            }
        });
    }
});