var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Page({
    data: {
        buttons: [ {
            className: "0",
            label: "个人兼职发布",
            icon: "../../public/icon/release_left.png"
        }, {
            className: "1",
            label: "企业兼职发布",
            icon: "../../public/icon/release_left.png"
        }, {
            className: "2",
            label: "企业全职发布",
            icon: "../../public/icon/release_left.png"
        } ],
        isRelease: !0,
        userinfo: {
            headImgUrl: "",
            nickName: ""
        }
    },
    onReady: function() {
        this.getAuthSetting();
    },
    onShow: function() {
        this.getAuthSetting(), this.setData({
            userinfo: {
                headImgUrl: null == wx.getStorageSync("userinfo").headImgUrl ? "../../public/images/head.png" : wx.getStorageSync("userinfo").headImgUrl,
                nickName: null == wx.getStorageSync("userinfo").nickName ? "" : wx.getStorageSync("userinfo").nickName
            }
        });
    },
    openUrl: function(e, t) {
        switch ("object" == (void 0 === e ? "undefined" : _typeof(e)) && (e = e.target.dataset.type), 
        e) {
          case "job_release":
            var a = "../../release/job_release/job_release?id=" + t;
            break;

          case "login":
            a = "../../common/login/login";
            break;

          case "phone_check":
            a = "../../common/phone_check/phone_check";
            break;

          case "resume":
            a = "../../my/resume/resume";
        }
        wx.navigateTo({
            url: a
        });
    },
    dorelease: function(e) {
        this.openUrl("job_release", e.detail.value.className);
    },
    getAuthSetting: function() {
        var e = this.data.buttons;
        switch (wx.getStorageSync("userinfo").level) {
          case "0":
            e = {}, this.setData({
                isRelease: !1
            });
            break;

          case "1":
            this.setData({
                isRelease: !0
            }), e.splice(1, 2);
            break;

          case "2":
            this.setData({
                isRelease: !0
            });
            break;

          default:
            this.setData({
                isRelease: !1
            });
        }
        this.setData({
            buttons: e
        });
    },
  changeToFirst() {
    wx.navigateTo({
      url: '../../denglu/denglu',
    })
  }
});