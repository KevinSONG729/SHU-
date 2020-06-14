var getDefaultActiveKey = function(t) {
    var e = t.filter(function(t) {
        return !t.data.disabled;
    })[0];
    return e ? e.data.key : null;
}, activeKeyIsValid = function(t, e) {
    return t.map(function(t) {
        return t.data.key;
    }).includes(e);
}, getActiveKey = function(t, e) {
    var n = getDefaultActiveKey(t);
    return e && activeKeyIsValid(t, e) ? e : n;
};

Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../tab/index": {
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
            type: String,
            value: ""
        },
        current: {
            type: String,
            value: "",
            observer: "changeCurrent"
        },
        scroll: {
            type: Boolean,
            value: !1
        },
        controlled: {
            type: Boolean,
            value: !1
        },
        theme: {
            type: String,
            value: "balanced"
        }
    },
    data: {
        activeKey: "",
        keys: []
    },
    methods: {
        updated: function(t, e) {
            var n = this, a = this.getRelationNodes("../tab/index"), i = getActiveKey(a, t);
            0 < a.length && e && (this.setData({
                activeKey: i
            }), a.forEach(function(t) {
                t.changeCurrent(t.data.key === i, n.data.scroll, n.data.theme);
            })), this.data.keys.length !== a.length && this.setData({
                keys: a.map(function(t) {
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
            this.data.activeKey !== t && this.updated(t, !this.data.controlled), this.emitEvent(t);
        }
    },
    ready: function() {
        var t = this.data, e = t.defaultCurrent, n = t.current, a = t.controlled ? n : e;
        this.updated(a, !0);
    }
});