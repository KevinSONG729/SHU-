var _index = require("../../../assembly/index");

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var common = require("../../../public/js/common.js"), app = getApp();

Page({
    data: {
        type: 1,
        settlement: 1,
        location: [],
        duration_array: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ],
        duration: 8,
        welfare: [],
        category: [],
        category_value: [ "销售代表", "00", [ 0, 0 ] ],
        description: ""
    },
    onReady: function() {
        this.load_category();
    },
    onLoad: function(t) {
        t.id && this.setData({
            type: t.id
        });
    },
    load_category: function() {
        var a = this, t = {
            m: "dawn_banana",
            type: 0
        };
        "" == wx.getStorageSync("position_category") ? app.util.request({
            url: "entry/wxapp/category.all",
            data: t,
            success: function(t) {
                if (console.log(t.data.data.length), 0 == t.data.code) {
                    new Array();
                    wx.setStorageSync("position_category", t.data.data), a.setData({
                        category: t.data.data.picker
                    });
                }
            }
        }) : a.setData({
            category: wx.getStorageSync("position_category").picker
        });
    },
    open: function() {
        var a = this;
        wx.showActionSheet({
            itemList: [ "日结", "月结" ],
            success: function(t) {
                t.cancel || a.setData({
                    settlement: t.tapIndex
                });
            }
        });
    },
    get_location: function() {
        var e = this;
        wx.chooseLocation({
            success: function(t) {
                var a = {};
                a.address = t.address, a.latitude = t.latitude, a.longitude = t.longitude, e.setData({
                    location: a
                }), console.log(a);
            }
        });
    },
    change_duration: function(t) {
        this.setData({
            duration: t.detail.value
        });
    },
    change_welfare: function(t) {
        var a = "welfare", e = t.detail.value, o = this.data[a], i = -1 === o.indexOf(e) ? [].concat(_toConsumableArray(o), [ e ]) : o.filter(function(t) {
            return t !== e;
        });
        this.setData(_defineProperty({}, a, i));
    },
    columnchange_category: function(t) {
        if (console.log(t.detail), "0" == t.detail.column && 0 <= t.detail.value) {
            var a = new Array(), e = this.data.category[0][t.detail.value];
            a = wx.getStorageSync("position_category").data[e];
            var o = [];
            o.push(this.data.category[0], a), console.log(o), this.setData({
                category: o
            });
        }
    },
    change_category: function(t) {
        if (console.log(t.detail.value), t.detail.value) {
            var a = t.detail.value, e = [ this.data.category[1][a[1]], a[0] + "" + a[1], a ];
            this.setData({
                category_value: e
            });
        }
    },
    changeDescription: function(t) {
        this.setData({
            description: t.detail.value
        });
    },
    formSubmit: function(t) {
        var a = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token
        };
        return "" == t.detail.value.position_title ? (common.modal_alert("请填写职位名称"), !1) : (a.position_title = t.detail.value.position_title, 
        2 == this.data.type && "" == this.data.category_value[1] ? (common.modal_alert("请选择职位类型"), 
        !1) : (a.category = this.data.category_value[1], 1 != this.data.settlement && 0 != this.data.settlement ? (common.modal_alert("请选择正确的薪资结算方式"), 
        !1) : (a.salary_type = this.data.settlement, "" == t.detail.value.salary_bottom || "" == t.detail.value.salary_top ? (common.modal_alert("请填写薪资待遇"), 
        !1) : (a.salary = t.detail.value.salary_bottom + "~" + t.detail.value.salary_top, 
        "" == t.detail.value.numbers ? (common.modal_alert("请填写招聘人数"), !1) : (a.numbers = t.detail.value.numbers, 
        a.welfare = this.data.welfare.join(","), "" == this.data.location ? (common.modal_alert("请选择您的地理位置"), 
        !1) : (a.worker_address = this.data.location.address, a.longitude = this.data.location.longitude, 
        a.latitude = this.data.location.latitude, "" == this.data.duration ? (common.modal_alert("请选择工作时长"), 
        !1) : (a.worker_time = this.data.duration, a.description = this.data.description, 
        "" == t.detail.value.contacts || "" == t.detail.value.phone ? (common.modal_alert("请填写您的联系方式"), 
        !1) : (a.contacts = t.detail.value.contacts, a.phone = t.detail.value.phone, a.userId = wx.getStorageSync("userinfo").userId, 
        a.type = this.data.type, a.m = "dawn_banana", void app.util.request({
            url: "entry/wxapp/position.sub_job",
            data: a,
            success: function(t) {
                0 == t.data.code && wx.navigateTo({
                    url: "/pages/common/result/result"
                });
            }
        })))))))));
    }
});