var _util = require("public/js/util.js"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(u) {
    return u && u.__esModule ? u : {
        default: u
    };
}

App({
    onLaunch: function() {
        wx.cloud.init({
            traceUser:true,
            env: 'test123-8i3t8'
          })
    },
    onShow: function() {},
    onHide: function() {},
    onError: function(u) {
        console.log(u);
    },
    util: _util2.default,
    globalData: {
        userInfo: null
    },
    siteInfo: require("siteinfo.js")
});