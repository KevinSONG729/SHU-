Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../checkbox-group/index": {
            type: "parent"
        }
    },
    properties: {
        title: {
            type: String,
            value: ""
        },
        label: {
            type: String,
            value: ""
        },
        extra: {
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
        checkboxChange: function(e) {
            var t = this.data, a = t.value, n = t.index, i = t.disabled, l = this.getRelationNodes("../checkbox-group/index")[0], c = {
                checked: e.detail.checked,
                value: a,
                index: n
            };
            i || (l ? l.emitEvent(c) : this.triggerEvent("change", c));
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