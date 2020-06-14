var common = require("../../../public/js/common.js"), app = getApp();

Page({
    data: {
        phone: "",
        checkCode: "",
        sendStatus: !1
    },
    change_phone: function(e) {
        e.detail.value && this.setData({
            phone: e.detail.value
        });
    },
    changeChackCode: function(e) {
        e.detail.value && this.setData({
            checkCode: e.detail.value
        });
    },
    getCheckCode: function() {
        var t = this, e = t.data.phone;
        if (!/^1(3|4|5|7|8)\d{9}$/.test(e)) return common.modal_alert("请填写正确的手机号"), !1;
        var a = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token,
            m: "dawn_banana"
        };
        a.phone = t.data.phone, app.util.request({
            url: "entry/wxapp/auth.sms",
            data: a,
            method: "POST",
            cachetime: 0,
            success: function(e) {
                0 == e.data.code ? (wx.showToast({
                    title: "已发送",
                    icon: "success",
                    duration: 2e3
                }), t.setData({
                    sendStatus: !0
                })) : common.modal_alert(e.data.msg);
            },
            fail: function(e) {
                common.modal_alert("网络超时");
            }
        });
    },
    doCheckCode: function() {
        var t = this, e = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token,
            m: "dawn_banana"
        };
        e.phone = t.data.phone, e.sms_code = t.data.checkCode, app.util.request({
            url: "entry/wxapp/auth.check_sms_code",
            method: "POST",
            data: e,
            cachetime: 0,
            success: function(e) {
                0 == e.data.code ? (wx.showToast({
                    title: "已认证",
                    icon: "success",
                    duration: 2e3
                }), t.setData({
                    sendStatus: !0
                })) : common.modal_alert(e.data.msg);
            },
            fail: function(e) {
                common.modal_alert("网络超时");
            }
        });
    }
});