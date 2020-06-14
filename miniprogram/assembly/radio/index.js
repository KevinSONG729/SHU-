Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../radio-group/index": {
            type: "parent"
        }
    },
    properties: {
        thumb: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        label: {
            type: String,
            value: ""
        },
        value: {
            type: String,
            value: ""
        },
        checked: {
            type: Boolean,
            value: !1,
            observer: function(e) {
                this.setData({
                    inputChecked: e
                });
            }
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        color: {
            type: String,
            value: "balanced"
        }
    },
    data: {
        index: 0,
        inputChecked: !1
    },
    methods: {
        radioChange: function(e) {
            var t = this.data, a = t.value, i = t.index, n = t.disabled, l = this.getRelationNodes("../radio-group/index")[0], d = {
                checked: e.detail.checked,
                value: a,
                index: i
            };
            n || (l ? l.emitEvent(d) : this.triggerEvent("change", d));
        },
        changeValue: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
            this.setData({
                inputChecked: e,
                index: t
            });
        }
    }
});