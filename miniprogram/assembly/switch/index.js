var _colors = require("../helpers/colors");

Component({
    externalClasses: [ "wux-class" ],
    behaviors: [ "wx://form-field" ],
    options: {
        multipleSlots: !0
    },
    data: {
        style: ""
    },
    properties: {
        value: {
            type: Boolean,
            value: !1
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        color: {
            type: String,
            value: "balanced",
            observer: function(e) {
                this.updateStyle((0, _colors.isPresetColor)(e));
            }
        }
    },
    methods: {
        onTap: function(e) {
            var t = this.data, o = t.value;
            if (t.disabled) return !1;
            this.triggerEvent("change", {
                value: !o
            });
        },
        updateStyle: function(e) {
            this.setData({
                style: "border-color: " + e + "; background-color: " + e + ";"
            });
        }
    },
    attached: function() {
        this.updateStyle((0, _colors.isPresetColor)(this.data.color));
    }
});