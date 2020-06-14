Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        label: {
            type: String,
            value: ""
        },
        extra: {
            type: String,
            value: ""
        },
        defaultValue: {
            type: String,
            value: ""
        },
        value: {
            type: String,
            value: "",
            observer: function(t) {
                this.data.controlled && this.updated(t);
            }
        },
        controlled: {
            type: Boolean,
            value: !1
        },
        placeholder: {
            type: String,
            value: ""
        },
        placeholderStyle: {
            type: String,
            value: ""
        },
        placeholderClass: {
            type: String,
            value: "textarea-placeholder"
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        maxlength: {
            type: Number,
            value: 140
        },
        autoHeight: {
            type: Boolean,
            value: !1
        },
        cursorSpacing: {
            type: Number,
            value: 11
        },
        focus: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                this.setData({
                    inputFocus: t
                });
            }
        },
        cursor: {
            type: Number,
            value: -1
        },
        showConfirmBar: {
            type: Boolean,
            value: !0
        },
        selectionStart: {
            type: Number,
            value: -1
        },
        selectionEnd: {
            type: Number,
            value: -1
        },
        adjustPosition: {
            type: Boolean,
            value: !0
        },
        rows: {
            type: Number,
            value: 1,
            observer: "updateHeight"
        },
        hasCount: {
            type: Boolean,
            value: !1
        },
        clear: {
            type: Boolean,
            value: !1
        },
        error: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        inputValue: "",
        inputFocus: !1,
        inputRows: 1,
        inputHeight: ""
    },
    methods: {
        updateHeight: function() {
            var a = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.rows, i = Math.max(1, parseInt(t)), n = this.data.inputRows;
            n !== i && wx.createSelectorQuery().in(this).select(".wux-textarea__item").boundingClientRect(function(t) {
                if (t) {
                    var e = (1 < n ? t.height / n : t.height) * i;
                    a.setData({
                        inputRows: i,
                        inputHeight: e
                    });
                }
            }).exec();
        },
        updated: function(t) {
            this.data.inputValue !== t && this.setData({
                inputValue: t
            });
        },
        onChange: function(t) {
            this.data.controlled || this.updated(t.detail.value), this.data.inputFocus || this.setData({
                inputFocus: !0
            }), this.triggerEvent("change", t.detail);
        },
        onFocus: function(t) {
            this.setData({
                inputFocus: !0
            }), this.triggerEvent("focus", t.detail);
        },
        onBlur: function(t) {
            this.setData({
                inputFocus: !1
            }), this.triggerEvent("blur", t.detail);
        },
        onConfirm: function(t) {
            this.triggerEvent("confirm", t.detail);
        },
        onClear: function() {
            var t = this.data, e = t.controlled, a = t.inputValue;
            this.setData({
                inputValue: e ? a : "",
                inputFocus: !0
            }), this.triggerEvent("clear", {
                value: ""
            });
        },
        onError: function() {
            this.triggerEvent("error", {
                value: this.data.inputValue
            });
        },
        onLineChange: function(t) {
            this.triggerEvent("linechange", t.detail);
        }
    },
    attached: function() {
        var t = this.data, e = t.defaultValue, a = t.value, i = t.controlled ? a : e;
        this.updated(i);
    },
    ready: function() {
        this.updateHeight();
    }
});