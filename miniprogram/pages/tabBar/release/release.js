Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    _goto: function(e) {
        "" != e.currentTarget.dataset.type && wx.navigateTo({
            url: "/pages/release/job_release/job_release?id=" + e.currentTarget.dataset.type
        });
    }
});