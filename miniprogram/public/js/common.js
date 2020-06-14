var QQMapWX = require("qqmap-wx-jssdk.min.js"), app = getApp(), demo = new QQMapWX({
    key: "4SVBZ-SBQ3F-SP2JD-N24W2-XWS5E-CSB3W"
});

function get_location(o) {
    wx.getLocation({
        type: "wgs84",
        success: function(t) {
            var a = t.latitude, n = t.longitude;
            demo.reverseGeocoder({
                location: {
                    latitude: a,
                    longitude: n
                },
                success: function(t) {
                    var e = {};
                    e.latitude = a, e.longitude = n, e.info = t.result.address, e.nation = t.result.address_component.nation, 
                    e.province = t.result.address_component.province, e.city = t.result.address_component.city, 
                    e.district = t.result.address_component.district, e.street = t.result.address_component.street, 
                    e.street_number = t.result.address_component.street_number, wx.setStorageSync("location", e), 
                    app.util.request({
                        url: "entry/wxapp/home.index",
                        data: {
                            m: "dawn_banana",
                            longitude: e.longitude,
                            latitude: e.latitude
                        },
                        cachetime: "5",
                        success: function(t) {
                            0 == t.data.code && (wx.setNavigationBarTitle({
                                title: t.data.data.title.title
                            }), o.setData({
                                location: e,
                                banner: t.data.data.banner,
                                nearby: t.data.data.nearby,
                                stick: t.data.data.stick,
                                notice: t.data.data.title.notice,
                                business: t.data.data.business
                            }));
                        }
                    });
                },
                fail: function(t) {
                    modal_alert("当前位置获取失败");
                }
            });
        }
    });
}

function modal_alert(t) {
    wx.showModal({
        content: t,
        showCancel: !1,
        success: function(t) {
            t.confirm;
        }
    });
}

module.exports = {
    get_location: get_location,
    modal_alert: modal_alert
};