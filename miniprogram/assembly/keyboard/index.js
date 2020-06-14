var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _mergeOptionsToData = require("../helpers/mergeOptionsToData"), _mergeOptionsToData2 = _interopRequireDefault(_mergeOptionsToData);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

var defaults = {
    className: "",
    titleText: "安全键盘",
    cancelText: "取消",
    inputText: "输入数字密码",
    showCancel: !0,
    disorder: !1,
    password: !0,
    maxlength: 6,
    onChange: function(e) {},
    callback: function(e) {}
}, upsetNums = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
    if (e) for (var a = Math.floor, n = Math.random, o = t.length, r = void 0, s = void 0, i = void 0, l = a(o / 2) + 1; l--; ) (r = a(n() * o)) !== (s = a(n() * o)) && (i = t[r], 
    t[r] = t[s], t[s] = i);
    for (var u = [], h = 0; h < 4; h++) u.push(t.slice(3 * h, 3 * (h + 1)));
    return u;
};

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    data: (0, _mergeOptionsToData2.default)(defaults),
    methods: {
        hide: function() {
            this.$$setData({
                in: !1
            });
        },
        show: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = upsetNums(e.disorder), a = e.maxlength <= 0 ? -1 : e.maxlength, n = -1 !== a ? [].concat(_toConsumableArray(new Array(a || defaults.maxlength))).map(function() {
                return 1;
            }) : [], o = this.$$mergeOptionsAndBindMethods(Object.assign({
                nums: t,
                keys: n,
                value: ""
            }, defaults, e));
            return this.$$setData(_extends({
                in: !0
            }, o)), this.hide.bind(this);
        },
        increase: function(e) {
            var t = e.currentTarget.dataset, a = String(t.value), n = this.data, o = n.value, r = n.maxlength;
            o.length >= r && -1 !== r || this.updateValue(o + a);
        },
        decrease: function(e) {
            var t = this.data.value;
            0 !== t.length && this.updateValue(t.substr(0, t.length - 1));
        },
        updateValue: function() {
            var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
            if (this.$$setData({
                value: t
            }), "function" == typeof this.fns.onChange && this.fns.onChange.call(this, t), t.length === this.data.maxlength) {
                var a = this.fns.onClose || this.fns.callback, n = function() {
                    return e.hide();
                };
                if (a && "function" == typeof a) {
                    var o = a.call(this, t);
                    "object" === (void 0 === o ? "undefined" : _typeof(o)) ? o.closePromise ? o.closePromise.then(n, n) : o.then(n, n) : !1 !== o && n();
                } else n();
            }
        }
    }
});