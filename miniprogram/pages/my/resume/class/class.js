var common = require("../../../../public/js/common.js"), app = getApp();

Page({
    data: {
        id: "",
        config: {},
        datalist: {},
        title: "",
        name: "",
        start_date: "",
        end_date: "",
        describe: "",
        experienceId: ""
    },
    onLoad: function(e) {
        if (e.id) {
            e.experienceId && (this.sel_experienceId(e.experienceId), this.setData({
                experienceId: e.experienceId
            }));
            var t = {};
            switch (e.id) {
              case "1":
                t.title = "身高要求", t.name = "体重要求", t.start_date = "年龄要求", t.end_date = "专业要求", t.describe = "爱好要求", 
                t.type = "workExperience", wx.setNavigationBarTitle({
                    title: "希望的ta"
                });
                break;

              case "2":
                t.title = "身高", t.name = "专业", t.start_date = "体重", t.end_date = "年龄", t.describe = "个人爱好", 
                t.type = "projectExperience", wx.setNavigationBarTitle({
                    title: "个人标签"
                });
                break;

              case "3":
                t.title = "初中学校", t.name = "高中学校", t.start_date = "入学日期", t.end_date = "毕业日期", t.describe = "", 
                t.type = "educationExperience", wx.setNavigationBarTitle({
                    title: "成长经历"
                });
                break;

              case "4":
                t.title = "机构名称", t.name = "培训方向", t.start_date = "开训日期", t.end_date = "结训日期", t.describe = "", 
                t.type = "trainingExperience", wx.setNavigationBarTitle({
                    title: "培训经历"
                });
            }
            this.setData({
                config: t,
                id: e.id
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    changeTitle: function(e) {
        e.detail.value && this.setData({
            title: e.detail.value
        });
    },
    changeName: function(e) {
        e.detail.value && this.setData({
            name: e.detail.value
        });
    },
    changeTextarea: function(e) {
        console.log(e.detail.value), e.detail.value && this.setData({
            describe: e.detail.value
        });
    },
    changeStart_date: function(e) {
        e.detail.value && this.setData({
            start_date: e.detail.value
        });
    },
    changeEnd_date: function(e) {
        e.detail.value && this.setData({
            end_date: e.detail.value
        });
    },
    formSubmit: function() {
        var e = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token,
            m: "dawn_banana"
        };
        if ("" == this.data.title) return common.modal_alert("请填写" + this.data.config.title), 
        !1;
        if (e.title = this.data.title, "" == this.data.name && 2 != this.data.id) return common.modal_alert("请填写" + this.data.config.name), 
        !1;
        if (e.name = this.data.name, "" == this.data.start_date) return common.modal_alert("请填写" + this.data.config.start_date), 
        !1;
        if (e.start_date = this.data.start_date, "" == this.data.end_date) return common.modal_alert("请填写" + this.data.config.end_date), 
        !1;
        if (e.end_date = this.data.end_date, "" == this.data.describe && 3 != this.data.id && 4 != this.data.id) return common.modal_alert("请填写" + this.data.config.describe), 
        !1;
        if (e.describe = this.data.describe, e.type = this.data.config.type, e.id = this.data.id, 
        "" == this.data.experienceId) var t = "entry/wxapp/resume.experience"; else {
            e.experienceId = this.data.experienceId;
            t = "entry/wxapp/resume.edit_experience";
        }
        app.util.request({
            url: t,
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
    sel_experienceId: function(e) {
        var t = this, a = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token,
            m: "dawn_banana"
        };
        a.experienceId = e, app.util.request({
            url: "entry/wxapp/resume.sel_experienceId",
            method: "GET",
            data: a,
            cachetime: "0",
            success: function(e) {
                0 == e.data.code && t.setData({
                    title: e.data.data.title,
                    name: e.data.data.name,
                    start_date: e.data.data.start_date,
                    end_date: e.data.data.end_date,
                    describe: e.data.data.describe
                });
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
    formReset: function() {
        var e = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token,
            m: "dawn_banana",
            experienceId: this.data.experienceId
        };
        app.util.request({
            url: "entry/wxapp/resume.del_experience",
            method: "GET",
            data: e,
            cachetime: "0",
            success: function(e) {
                0 == e.data.code ? wx.navigateBack({
                    delta: 1
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
    }
});