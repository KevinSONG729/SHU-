Page({
    data: {
        buttons: [ {
            type: "energized",
            block: !0,
            text: "确定"
        } ],
        icon: {
            color: "#FBC139"
        }
    },
    onClick: function(e) {
        console.log(e);
        e.detail.index;
        wx.navigateBack({
            delta: 2
        });
    }
});