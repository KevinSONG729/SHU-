var app = getApp();

Page({
    data: {
        page: 1,
        limit: 20,
        datalist: [],
        onReachBottom: !1
    },
    onReady: function() {
        this.get_nearby_position();
    },
    get_nearby_position: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/position.nearby",
            data: {
                m: "dawn_banana",
                longitude: wx.getStorageSync("location").longitude,
                latitude: wx.getStorageSync("location").latitude,
                page: e.data.page,
                limit: e.data.limit
            },
            cachetime: "0",
            success: function(a) {
                if (console.log(e.data.page), 0 == a.data.code) {
                    var t = e.data.page * e.data.limit;
                    a.data.data.pageNum > t && e.data.page + 1 < 5 ? e.setData({
                        onReachBottom: !0,
                        page: e.data.page + 1,
                        datalist: e.data.datalist.concat(a.data.data.data)
                    }) : e.setData({
                        onReachBottom: !1
                    });
                }
            }
        });
    },
    onReachBottom: function() {
        1 == this.data.onReachBottom && this.get_nearby_position();
    }
});