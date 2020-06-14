var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var s = arguments[t];
        for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]);
    }
    return e;
}, _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _mergeOptionsToData = require("../helpers/mergeOptionsToData"), _mergeOptionsToData2 = _interopRequireDefault(_mergeOptionsToData), _index = require("../index");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var defaults = {
    type: "default",
    duration: 1500,
    color: "#fff",
    text: "",
    icon: "",
    mask: !0,
    success: function() {}
}, iconTypes = {
    success: "ios-checkmark-circle-outline",
    cancel: "ios-close-circle-outline",
    forbidden: "ios-alert",
    text: "",
    default: ""
}, _toast = null;

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    data: (0, _mergeOptionsToData2.default)(defaults),
    methods: {
        hide: function() {
            this.$$setData({
                in: !1
            }), this.$wuxBackdrop && this.$wuxBackdrop.release(), "function" == typeof this.fns.success && this.fns.success();
        },
        show: function(i) {
            var n = this;
            "string" == typeof i && (i = Object.assign({}, {
                text: i
            }, arguments[1]));
            var s = new Promise(function(e) {
                var t = n.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, i)), s = iconTypes[t.type] || t.icon;
                t.icon = s, n.$$setData(_extends({
                    in: !0
                }, t)), n.$wuxBackdrop && n.$wuxBackdrop.retain(), _toast && (clearTimeout(_toast.timeout), 
                _toast = null), (_toast = {
                    hide: n.hide
                }).timeout = setTimeout(function() {
                    return n.hide(), e(!0);
                }, Math.max(0, t.duration));
            }), e = function() {
                _toast && _toast.hide.call(n);
            };
            return e.then = function(e, t) {
                return s.then(e, t);
            }, e.promise = s, e;
        },
        success: function(e) {
            return "string" == typeof e && (e = Object.assign({}, {
                text: e
            }, arguments[1])), this.show(Object.assign({
                type: "success"
            }, e));
        },
        warning: function(e) {
            return "string" == typeof e && (e = Object.assign({}, {
                text: e
            }, arguments[1])), this.show(Object.assign({
                type: "forbidden"
            }, e));
        },
        error: function(e) {
            return "string" == typeof e && (e = Object.assign({}, {
                text: e
            }, arguments[1])), this.show(Object.assign({
                type: "cancel"
            }, e));
        },
        info: function(e) {
            return "string" == typeof e && (e = Object.assign({}, {
                text: e
            }, arguments[1])), this.show(Object.assign({
                type: "text"
            }, e));
        }
    },
    created: function() {
        this.data.mask && (this.$wuxBackdrop = (0, _index.$wuxBackdrop)("#wux-backdrop", this));
    }
});