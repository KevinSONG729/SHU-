function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../accordion/index": {
            type: "child",
            linked: function() {
                this.changeCurrent();
            },
            linkChanged: function() {
                this.changeCurrent();
            },
            unlinked: function() {
                this.changeCurrent();
            }
        }
    },
    properties: {
        defaultCurrent: {
            type: Array,
            value: []
        },
        current: {
            type: Array,
            value: [],
            observer: "changeCurrent"
        },
        controlled: {
            type: Boolean,
            value: !1
        },
        accordion: {
            type: Boolean,
            value: !1
        },
        title: {
            type: String,
            value: ""
        },
        label: {
            type: String,
            value: ""
        }
    },
    data: {
        activeKey: "",
        keys: []
    },
    methods: {
        updated: function(r, t) {
            var i = this, e = this.getRelationNodes("../accordion/index");
            0 < e.length && t && (this.setData({
                activeKey: r
            }), e.forEach(function(t, e) {
                var a = t.data.key || String(e), n = i.data.accordion ? r[0] === a : -1 !== r.indexOf(a);
                t.changeCurrent(n, a);
            })), this.data.keys.length !== e.length && this.setData({
                keys: e.map(function(t) {
                    return t.data;
                })
            });
        },
        changeCurrent: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.current;
            this.updated(t, this.data.controlled);
        },
        emitEvent: function(t) {
            this.triggerEvent("change", {
                key: t,
                keys: this.data.keys
            });
        },
        setActiveKey: function(t) {
            this.data.activeKey !== t && this.updated(t, !this.data.controlled), this.emitEvent(this.data.accordion ? t[0] : t);
        },
        onClickItem: function(e) {
            var t = [].concat(_toConsumableArray(this.data.activeKey));
            t = this.data.accordion ? t[0] === e ? [] : [ e ] : -1 !== t.indexOf(e) ? t.filter(function(t) {
                return t !== e;
            }) : [].concat(_toConsumableArray(t), [ e ]), this.setActiveKey(t);
        }
    },
    ready: function() {
        var t = this.data, e = t.defaultCurrent, a = t.current, n = t.controlled ? a : e;
        this.updated(n, !0);
    }
});