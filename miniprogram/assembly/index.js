Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.$wuxCountUp = exports.$wuxCountDown = exports.$stopWuxRefresher = exports.$wuxCalendar = exports.$wuxSelect = exports.$wuxKeyBoard = exports.$wuxNotification = exports.$wuxGallery = exports.$wuxToptips = exports.$wuxDialog = exports.$wuxLoading = exports.$wuxToast = exports.$wuxBackdrop = exports.$wuxActionSheet = void 0;

var _index = require("./countdown/index"), _index2 = _interopRequireDefault(_index), _index3 = require("./countup/index"), _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var getCtx = function(e) {
    var t = (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : getCurrentPages()[getCurrentPages().length - 1]).selectComponent(e);
    if (!t) throw new Error("无法找到对应的组件，请按文档说明使用组件");
    return t;
}, $wuxActionSheet = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-actionsheet", t = arguments[1];
    return getCtx(e, t);
}, $wuxBackdrop = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-backdrop", t = arguments[1];
    return getCtx(e, t);
}, $wuxToast = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-toast", t = arguments[1];
    return getCtx(e, t);
}, $wuxLoading = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-loading", t = arguments[1];
    return getCtx(e, t);
}, $wuxDialog = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-dialog", t = arguments[1];
    return getCtx(e, t);
}, $wuxToptips = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-toptips", t = arguments[1];
    return getCtx(e, t);
}, $wuxGallery = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-gallery", t = arguments[1];
    return getCtx(e, t);
}, $wuxNotification = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-notification", t = arguments[1];
    return getCtx(e, t);
}, $wuxKeyBoard = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-keyboard", t = arguments[1];
    return getCtx(e, t);
}, $wuxSelect = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-select", t = arguments[1];
    return getCtx(e, t);
}, $wuxCalendar = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-calendar", t = arguments[1];
    return getCtx(e, t);
}, $stopWuxRefresher = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-refresher", t = arguments[1];
    return getCtx(e, t).finishPullToRefresh();
};

exports.$wuxActionSheet = $wuxActionSheet, exports.$wuxBackdrop = $wuxBackdrop, 
exports.$wuxToast = $wuxToast, exports.$wuxLoading = $wuxLoading, exports.$wuxDialog = $wuxDialog, 
exports.$wuxToptips = $wuxToptips, exports.$wuxGallery = $wuxGallery, exports.$wuxNotification = $wuxNotification, 
exports.$wuxKeyBoard = $wuxKeyBoard, exports.$wuxSelect = $wuxSelect, exports.$wuxCalendar = $wuxCalendar, 
exports.$stopWuxRefresher = $stopWuxRefresher, exports.$wuxCountDown = _index2.default, 
exports.$wuxCountUp = _index4.default;