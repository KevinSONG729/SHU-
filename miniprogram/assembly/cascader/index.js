var _arrayTreeFilter = require("../helpers/arrayTreeFilter"), _arrayTreeFilter2 = _interopRequireDefault(_arrayTreeFilter);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
        return i;
    }
    return Array.from(e);
}

var WUX_CASCADER = "wux-cascader", defaultFieldNames = {
    label: "label",
    value: "value",
    children: "children"
};

Component({
    externalClasses: [ "wux-class", "wux-scroll-view-class" ],
    properties: {
        defaultValue: {
            type: Array,
            value: []
        },
        value: {
            type: Array,
            value: [],
            observer: function(e) {
                var t = this;
                this.data.controlled && this.setData({
                    activeValue: e
                }, function() {
                    return t.getCurrentOptions(e);
                });
            }
        },
        controlled: {
            type: Boolean,
            value: !1
        },
        title: {
            type: String,
            value: ""
        },
        options: {
            type: Array,
            value: []
        },
        chooseTitle: {
            type: String,
            value: "请选择"
        },
        visible: {
            type: Boolean,
            value: !1
        },
        defaultFieldNames: {
            type: Object,
            value: defaultFieldNames
        }
    },
    data: {
        activeOptions: [],
        activeIndex: 0,
        bodyStyle: "",
        activeValue: [],
        showOptions: [],
        fieldNames: {}
    },
    methods: {
        getActiveOptions: function(i) {
            var e = this.data.options, a = this.getFieldName("value"), t = this.getFieldName("children");
            return (0, _arrayTreeFilter2.default)(e, function(e, t) {
                return e[a] === i[t];
            }, {
                childrenKeyName: t
            });
        },
        getShowOptions: function(e) {
            var t = this.data.options, i = this.getFieldName("children"), a = this.getActiveOptions(e).map(function(e) {
                return e[i];
            }).filter(function(e) {
                return !!e;
            });
            return [ t ].concat(_toConsumableArray(a));
        },
        getMenus: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1], i = this.data, a = i.options, n = i.chooseTitle, r = this.getActiveOptions(e);
            if (t && r.length < a.length) {
                var l, o = this.getFieldName("value"), s = this.getFieldName("label");
                r.push((_defineProperty(l = {}, o, WUX_CASCADER), _defineProperty(l, s, n), l));
            }
            return r;
        },
        getNextActiveValue: function(e, t) {
            var i = this.data.activeValue;
            return (i = i.slice(0, t + 1))[t] = e, i;
        },
        updated: function(e, t, i, a) {
            var n = this.getFieldName("value"), r = this.getFieldName("children"), l = e[r] && 0 < e[r].length, o = this.getNextActiveValue(e[n], t), s = this.getMenus(o, l), u = s.length - 1, d = this.getShowOptions(o), h = {
                activeValue: o,
                activeOptions: s,
                activeIndex: u,
                showOptions: d
            };
            (l || o.length === d.length && (t = Math.max(0, t - 1))) && (h.bodyStyle = "transform: translate(" + -50 * t + "%)", 
            h.showOptions = d), i && this.setData(h), "function" == typeof a && a.call(this, e, s, !l);
        },
        getCurrentOptions: function(e) {
            var t = Math.max(0, e.length - 1), i = this.getActiveOptions(e), a = i[t];
            if (a) this.updated(a, t, !0); else {
                var n, r = this.getFieldName("value"), l = this.getFieldName("label");
                i.push((_defineProperty(n = {}, r, WUX_CASCADER), _defineProperty(n, l, this.data.chooseTitle), 
                n));
                var o = {
                    showOptions: this.getShowOptions(e),
                    activeOptions: i,
                    activeIndex: i.length - 1,
                    bodyStyle: ""
                };
                this.setData(o);
            }
        },
        onMenuClick: function(e) {
            var t = e.currentTarget.dataset.menuIndex, i = "transform: translate(" + -50 * (1 < t ? t - 1 : 0) + "%)";
            this.setData({
                bodyStyle: i,
                activeIndex: t
            });
        },
        onItemSelect: function(e) {
            var t = e.currentTarget.dataset, i = t.item, a = t.optionIndex;
            i && !i.disabled && this.updated(i, a, !this.data.controlled, this.onChange);
        },
        onPopupClose: function() {
            this.triggerEvent("close");
        },
        onChange: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = this, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [], a = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], n = i.filter(function(e) {
                return e[t.getFieldName("value")] !== WUX_CASCADER;
            }), r = n.map(function(e) {
                return e[t.getFieldName("value")];
            });
            if (!1 === e.isLeaf && !e.children) return this.emitEvent({
                value: r,
                options: n,
                done: !1
            }), void this.triggerEvent("load", {
                value: r,
                options: n
            });
            this.emitEvent({
                value: r,
                options: n,
                done: a
            });
        },
        emitEvent: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            this.triggerEvent("change", e), e.done && this.onPopupClose();
        },
        getFieldName: function(e) {
            return this.data.fieldNames[e];
        }
    },
    attached: function() {
        var e = this, t = this.data, i = t.defaultValue, a = t.value, n = t.controlled ? a : i, r = Object.assign({}, defaultFieldNames, this.data.defaultFieldNames);
        this.setData({
            activeValue: n,
            fieldNames: r
        }, function() {
            return e.getCurrentOptions(n);
        });
    }
});