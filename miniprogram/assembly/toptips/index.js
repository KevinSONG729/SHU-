var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
}, _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _mergeOptionsToData = require("../helpers/mergeOptionsToData"), _mergeOptionsToData2 = _interopRequireDefault(_mergeOptionsToData);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var defaults = {
    icon: "cancel",
    hidden: !1,
    text: "",
    duration: 3e3,
    success: function() {}
}, _toptips = null;

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    data: (0, _mergeOptionsToData2.default)(defaults),
    methods: {
        hide: function() {
            this.$$setData({
                in: !1
            }), "function" == typeof this.fns.success && this.fns.success();
        },
        show: function() {
            var n = this, i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, s = new Promise(function(e) {
                var t = n.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, i));
                n.$$setData(_extends({
                    in: !0
                }, t)), _toptips && (clearTimeout(_toptips.timeout), _toptips = null), (_toptips = {
                    hide: n.hide
                }).timeout = setTimeout(function() {
                    return n.hide(), e(!0);
                }, t.duration);
            }), e = function() {
                _toptips && _toptips.hide.call(n);
            };
            return e.then = function(e, t) {
                return s.then(e, t);
            }, e.promise = s, e;
        },
        success: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return this.show(Object.assign({
                icon: "success"
            }, e));
        },
        info: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return this.show(Object.assign({
                icon: "info"
            }, e));
        },
        warn: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return this.show(Object.assign({
                icon: "warn"
            }, e));
        },
        error: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return this.show(Object.assign({
                icon: "cancel"
            }, e));
        }
    }
});