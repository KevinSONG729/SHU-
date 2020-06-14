Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../tabbar-item/index": {
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
        controlled: {
            type: Boolean,
            value: !1
        },
        theme: {
            type: String,
            value: "balanced"
        },
        position: {
            type: String,
            value: ""
        }
    },
    data: {
        activeKey: "",
        keys: []
    },
    methods: {
        updated: function(i, t) {
            var r = this, s = this.getRelationNodes("../tabbar-item/index");
            0 < s.length && t && (this.setData({
                activeKey: i
            }), s.forEach(function(t, e) {
                var n = t.data.key || String(e), a = n === i;
                t.changeCurrent(a, n, r.data.theme, s.length);
            })), this.data.keys.length !== s.length && this.setData({
                keys: s.map(function(t) {
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