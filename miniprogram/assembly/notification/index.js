var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }
    return t;
}, _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _mergeOptionsToData = require("../helpers/mergeOptionsToData"), _mergeOptionsToData2 = _interopRequireDefault(_mergeOptionsToData);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var defaults = {
    image: "",
    title: "",
    text: "",
    duration: 3e3,
    data: "",
    onClick: function() {},
    onClose: function() {}
}, _notification = null;

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    data: (0, _mergeOptionsToData2.default)(defaults),
    methods: {
        hide: function() {
            this.$$setData({
                in: !1
            }), "function" == typeof this.fns.onClose && this.fns.onClose(this.data.data);
        },
        show: function() {
            var i = this, n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, o = new Promise(function(t) {
                var e = i.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, n));
                i.$$setData(_extends({
                    in: !0
                }, e)), _notification && (clearTimeout(_notification.timeout), _notification = null), 
                (_notification = {
                    hide: i.hide
                }).timeout = setTimeout(function() {
                    return i.hide(), t(!0);
                }, e.duration);
            }), t = function() {
                _notification && _notification.hide.call(i);
            };
            return t.then = function(t, e) {
                return o.then(t, e);
            }, t.promise = o, t;
        },
        onClick: function() {
            "function" == typeof this.fns.onClick && this.fns.onClick(this.data.data);
        }
    }
});