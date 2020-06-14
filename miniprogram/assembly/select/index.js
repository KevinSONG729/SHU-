var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
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
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

var defaults = {
    value: "",
    options: [],
    multiple: !1,
    max: -1,
    toolbar: {
        title: "请选择",
        cancelText: "取消",
        confirmText: "确定"
    },
    onChange: function() {},
    onConfirm: function() {},
    onCancel: function() {}
}, getSelectIndex = function(e) {
    var t = e.value, n = void 0 === t ? "" : t, a = e.options, o = void 0 === a ? [] : a, i = e.multiple, r = void 0 !== i && i, s = o.map(function(e) {
        return e.value || e;
    });
    return r ? (n || []).map(function(e) {
        return s.indexOf(e);
    }) : s.indexOf(n);
};

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    data: (0, _mergeOptionsToData2.default)(defaults),
    methods: {
        open: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, e, {
                max: parseInt(e.max)
            })), n = getSelectIndex(t);
            this.$$setData(_extends({
                visible: !0
            }, t, {
                index: n
            }));
        },
        close: function(e) {
            if (this.$$setData({
                visible: !1
            }), "function" == typeof e) {
                var t = this.data, n = t.value, a = t.index, o = t.options;
                e.call(this, n, a, o);
            }
        },
        onConfirm: function() {
            this.close(this.fns.onConfirm);
        },
        onCancel: function(e) {
            this.close(this.fns.onCancel);
        },
        onCheckboxChange: function(e) {
            var t = this.data.value, n = e.detail, a = n.value, o = n.checked ? [].concat(_toConsumableArray(t), [ a ]) : t.filter(function(e) {
                return e !== a;
            }), i = getSelectIndex(_extends({}, this.data, {
                value: o
            }));
            this.onChange(o, i);
        },
        onRadioChange: function(e) {
            var t = e.detail, n = t.value, a = t.index;
            this.onChange(n, a);
        },
        onChange: function(e, t) {
            var n = this.data, a = n.options, o = n.max;
            n.multiple && 1 <= o && o < e.length || (this.$$setData({
                value: e,
                index: t
            }), "function" == typeof this.fns.onChange && this.fns.onChange.call(this, e, t, a));
        }
    }
});