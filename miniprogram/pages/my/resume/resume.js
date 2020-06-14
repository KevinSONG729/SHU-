var common = require("../../../public/js/common.js"), app = getApp();

Page({
    data: {
        resumeInfo: {
            name: "",
            sex: "",
            age: "",
            area: "",
            is_marry: "",
            education: "",
            phone: "",
            email: "",
            wechat_id: ""
        }
    },
    onReady: function() {
        this.getResumeInfo();
    },
    onShow: function() {
        this.getResumeInfo();
    },
    openUrl: function(e) {
        if (e.target.dataset.url) {
            var t = e.target.dataset.url;
            if (e.target.dataset.title && e.target.dataset.model) var a = "?title=" + e.target.dataset.title + "&model=" + e.target.dataset.model; else if (e.target.dataset.id) {
                a = "?id=" + e.target.dataset.id;
                e.target.dataset.id && e.target.dataset.experienceid && (a += "&experienceId=" + e.target.dataset.experienceid);
            } else a = "";
            wx.navigateTo({
                url: "./" + t + "/" + t + a
            });
        }
    },
    getResumeInfo: function() {
        var t = this, e = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token,
            m: "dawn_banana"
        };
        app.util.request({
            url: "entry/wxapp/resume.sel_resume",
            method: "GET",
            data: e,
            cachetime: "0",
            success: function(e) {
                0 == e.data.code && t.setData({
                    resumeInfo: e.data.data
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "成功",  /*这里的URL需要修改，应该改成相应数据库的信息，同时前面界面的匹配也要做一定的修改  原本信息：网络延迟*/
                    icon: "success",
                    duration: 1e3
                });
            }
        });
    }
});