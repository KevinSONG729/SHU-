var common = require("../../../../public/js/common.js"), app = getApp();

Page({
    data: {
        title: "",
        model: "",
        textarea: ""
    },
    onLoad: function(e) {
        console.log(e), e.title && e.model && (this.setData({
            title: e.title,
            model: e.model
        }), wx.setNavigationBarTitle({
            title: e.title
        })), this.sel_basic();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    changeTextarea: function(e) {
        console.log(e.detail.value), !1 !== e.detail.value && this.setData({
            textarea: e.detail.value
        });
    },
    formSubmit: function() {
        var e = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token,
            m: "dawn_banana"
        };
        e.textarea = this.data.textarea, app.util.request({
            url: "entry/wxapp/resume." + this.data.model,
            method: "POST",
            data: e,
            cachetime: "0",
            success: function(e) {
                0 == e.data.code ? wx.showToast({
                    icon: "success",
                    duration: 1e3
                }) : common.modal_alert(e.data.msg);
            },
            fail: function(e) {
                wx.showToast({
                    title: "网络延迟",
                    icon: "success",
                    duration: 1e3
                });
            }
        });
    },
    sel_basic: function() {
        var t = this, e = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token,
            m: "dawn_banana",
            type: "textarea",
            field: this.data.model
        };
        app.util.request({
            url: "entry/wxapp/resume.sel_data",
            method: "GET",
            data: e,
            cachetime: "0",
            success: function(e) {
                0 == e.data.code ? "evaluation" == t.data.model ? t.setData({
                    textarea: e.data.data.evaluation
                }) : t.setData({
                    textarea: e.data.data.honor
                }) : common.modal_alert("网络异常");
            },
            fail: function(e) {
                common.modal_alert("网络异常");
            }
        });
    }
});