var _colors = require("../helpers/colors");

Component({
    externalClasses: [ "wux-class", "wux-input-class" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        type: {
            type: String,
            value: "checkbox"
        },
        value: {
            type: String,
            value: ""
        },
        defaultChecked: {
            type: Boolean,
            value: !1
        },
        checked: {
            type: Boolean,
            value: !1,
            observer: function(e) {
                this.data.controlled && this.updated(e);
            }
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        color: {
            type: String,
            value: "balanced",
            observer: function(e) {
                this.setData({
                    inputColor: (0, _colors.isPresetColor)(e)
                });
            }
        },
        controlled: {
            type: Boolean,
            value: !1
        },
        wrapStyle: {
            type: String,
            value: ""
        }
    },
    data: {
        inputChecked: !1,
        inputColor: ""
    },
    methods: {
        updated: function(e) {
            this.data.inputChecked !== e && this.setData({
                inputChecked: e
            });
        },
        onChange: function() {
            var e = this.data, t = e.value, a = e.inputChecked, o = e.disabled, l = e.controlled, n = {
                checked: !a,
                value: t
            };
            o || (l || this.updated(!a), this.triggerEvent("change", n));
        }
    },
    attached: function() {
        var e = this.data, t = e.defaultChecked, a = e.checked, o = e.controlled ? a : t, l = (0, 
        _colors.isPresetColor)(this.data.color);
        this.setData({
            inputChecked: o,
            inputColor: l
        });
    }
});