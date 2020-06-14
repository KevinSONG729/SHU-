var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _index = require("../index");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    properties: {
        items: {
            type: Array,
            value: []
        }
    },
    methods: {
        onReset: function(e, t) {
            var n = e.currentTarget.dataset, i = n.index, r = n.item, c = t && t.children || r.children.map(function(e) {
                return Object.assign({}, e, {
                    children: e.children.map(function(e) {
                        return Object.assign({}, e, {
                            checked: !1
                        });
                    }),
                    selected: ""
                });
            });
            this.$$setData(_defineProperty({}, "items[" + i + "].children", c));
        },
        onClose: function(e, t) {
            var n = this, i = _defineProperty({}, "items[" + e.currentTarget.dataset.index + "].visible", !1);
            this.$$setData(i).then(function() {
                "function" == typeof t ? t.call(n, e) : n.onReset(e, n.prevState), n.$wuxBackdrop.release();
            });
        },
        onConfirm: function(e) {
            this.onClose(e, this.onChange);
        },
        onRadioChange: function(e) {
            var t, n = e.detail.value, i = e.currentTarget.dataset, r = i.index, c = i.item, o = i.parentIndex, a = c.children.map(function(e) {
                return Object.assign({}, e, {
                    checked: e.value === n
                });
            }), s = a.filter(function(e) {
                return e.checked;
            }).map(function(e) {
                return e.label;
            }).join(",");
            this.$$setData((_defineProperty(t = {}, "items[" + o + "].children[" + r + "].children", a), 
            _defineProperty(t, "items[" + o + "].children[" + r + "].selected", s), t));
        },
        onCheckboxChange: function(e) {
            var t, n = e.detail.value, i = e.currentTarget.dataset, r = i.index, c = i.item, o = i.parentIndex, a = c.children.map(function(e) {
                return Object.assign({}, e, {
                    checked: n.includes(e.value)
                });
            }), s = a.filter(function(e) {
                return e.checked;
            }).map(function(e) {
                return e.label;
            }).join(",");
            this.$$setData((_defineProperty(t = {}, "items[" + o + "].children[" + r + "].children", a), 
            _defineProperty(t, "items[" + o + "].children[" + r + "].selected", s), t));
        },
        radioChange: function(e) {
            var t = this, n = e.detail.value, i = e.currentTarget.dataset, r = _defineProperty({}, "items[" + i.index + "].children", i.item.children.map(function(e) {
                return Object.assign({}, e, {
                    checked: e.value === n
                });
            }));
            this.$$setData(r).then(function() {
                return t.onChange();
            });
        },
        checkboxChange: function(e) {
            var t = this, n = e.detail.value, i = e.currentTarget.dataset, r = i.index, c = i.item, o = c.children.filter(function(e) {
                return e.checked;
            }).map(function(e) {
                return e.value;
            }), a = _defineProperty({}, "items[" + r + "].children", c.children.map(function(e) {
                return Object.assign({}, e, {
                    checked: e.value === n ? !o.includes(e.value) : e.checked
                });
            }));
            this.$$setData(a).then(function() {
                return t.onChange();
            });
        },
        onClick: function(e) {
            var t = e.currentTarget.dataset.index;
            this.onOpenSelect(this.data.items, t);
        },
        onOpenSelect: function() {
            var r = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, o = e[c], t = e.map(function(e, t) {
                var n = Object.assign({}, e, {
                    checked: c === t && !e.checked
                });
                if (e.checked) {
                    var i = r.getDifference(e.groups, o.groups);
                    n.checked = !!i.length, c === t || i.length || ("object" === _typeof(n.children) && ([ "radio", "checkbox" ].includes(e.type) && (n.children = n.children.map(function(e) {
                        return Object.assign({}, e, {
                            checked: !1
                        });
                    })), [ "filter" ].includes(e.type) && (n.children = n.children.map(function(e) {
                        return Object.assign({}, e, {
                            children: e.children.map(function(e) {
                                return Object.assign({}, e, {
                                    checked: !1
                                });
                            }),
                            selected: ""
                        });
                    }))), [ "sort" ].includes(e.type) && (n.sort = void 0));
                }
                return [ "radio", "checkbox", "filter" ].includes(e.type) && (n.visible = c === t && !e.visible, 
                "filter" === e.type && r.$wuxBackdrop[c === t ? e.visible ? "release" : "retain" : "release"]()), 
                c === t && [ "sort" ].includes(e.type) && (n.sort = "number" == typeof n.sort ? -n.sort : 1), 
                n;
            });
            this.$$setData({
                items: t,
                index: c
            }).then(function() {
                r.prevState = o, [ "radio", "checkbox", "filter" ].includes(o.type) || r.onChange();
            });
        },
        onCloseSelect: function() {
            var e = this.data.items, n = {};
            e.forEach(function(e, t) {
                e.checked && e.visible && (n["items[" + t + "].visible"] = !1);
            }), this.$$setData(n);
        },
        getDifference: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [];
            return e.filter(function(e) {
                return t.includes(e);
            });
        },
        onChange: function() {
            var e = this, t = this.data.items, n = t.filter(function(e) {
                return e.checked;
            });
            this.$$requestAnimationFrame(function() {
                return e.onCloseSelect();
            }, 300).then(function() {
                return e.triggerEvent("change", {
                    checkedItems: n,
                    items: t
                });
            });
        },
        onScroll: function(e) {
            this.triggerEvent("scroll", e);
        },
        onEnter: function(e) {
            this.triggerEvent("open", e);
        },
        onExit: function(e) {
            this.triggerEvent("close", e);
        }
    },
    created: function() {
        this.$wuxBackdrop = (0, _index.$wuxBackdrop)("#wux-backdrop", this);
    }
});