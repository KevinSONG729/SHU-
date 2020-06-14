Component({
    externalClasses: [ "wux-class" ],
    properties: {
        theme: {
            type: String,
            value: "balanced"
        },
        defaultCurrent: {
            type: Number,
            value: 0
        },
        current: {
            type: Number,
            value: 0,
            observer: function(e) {
                this.data.controlled && this.setData({
                    activeKey: e
                });
            }
        },
        values: {
            type: Array,
            value: []
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        controlled: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        activeKey: 0
    },
    methods: {
        onTap: function(e) {
            if (this.data.disabled) return !1;
            this.setActiveKey(e.currentTarget.dataset.index);
        },
        emitEvent: function(e) {
            this.triggerEvent("change", {
                key: e,
                values: this.data.values
            });
        },
        setActiveKey: function(e) {
            this.data.activeKey !== e && (this.data.controlled || this.setData({
                activeKey: e
            })), this.emitEvent(e);
        }
    },
    attached: function() {
        var e = this.data, t = e.defaultCurrent, a = e.current, i = e.controlled ? a : t;
        this.data.activeKey !== i && this.setData({
            activeKey: i
        });
    }
});