var common = require("../../../public/js/common.js"), app = getApp();

Page({
    data: {
        location: "",
        banner: [],
        nearby: [],
        stick: [],
        business: [],
        notice: "",
        tabs: [ {
            key: "0",
            title: "推荐职位",
            content: "Content of tab 1"
        }, {
            key: "1",
            title: "推荐企业",
            content: "Content of tab 2"
        } ],
        current: "0"
    },
    onReady: function() {},
    onLoad: function(t) {
        common.get_location(this);
    },
    onTabsChange: function(t) {
        var n = t.detail.key, e = this.data.tabs.map(function(t) {
            return t.key;
        }).indexOf(n);
        if (this.setData({
            key: n,
            index: e
        }), t.detail.key) {
            var a = t.detail.key;
            this.setData({
                current: a
            });
        }
    },
    openUrl: function() {
        wx.navigateTo({
            url: "/pages/position/nearby_position/nearby_position"
        });
    },
    toMatchSuccess: function(){
        wx.navigateTo({
            url: "/pages/matchSuccess/matchSuccess"
        });
    }
});