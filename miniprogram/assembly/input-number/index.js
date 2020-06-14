var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1, toNumberWhenUserInput = function(t) {
    return /\.\d*0$/.test(t) || 16 < t.length ? t : isNaN(t) ? t : Number(t);
}, getValidValue = function(t, e, a) {
    var i = parseFloat(t);
    return isNaN(i) ? t : (i < e && (i = e), a < i && (i = a), i);
};

Component({
    externalClasses: [ "wux-class", "wux-sub-class", "wux-input-class", "wux-add-class" ],
    properties: {
        shape: {
            type: String,
            value: "square"
        },
        min: {
            type: Number,
            value: -MAX_SAFE_INTEGER
        },
        max: {
            type: Number,
            value: MAX_SAFE_INTEGER
        },
        step: {
            type: Number,
            value: 1
        },
        defaultValue: {
            type: Number,
            value: 0
        },
        value: {
            type: Number,
            value: 0,
            observer: function(t, e) {
                this.data.controlled && this.updated(t);
            }
        },
        disabled: {
            type: Boolean,
            value: !0
        },
        longpress: {
            type: Boolean,
            value: !1
        },
        color: {
            type: String,
            value: "balanced"
        },
        controlled: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        inputValue: 0,
        disabledMin: !1,
        disabledMax: !1
    },
    methods: {
        updated: function(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1], a = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], i = this.data, u = i.min, n = i.max, l = getValidValue(t, u, n), s = l <= u, r = n <= l;
            e && this.setData({
                inputValue: l,
                disabledMin: s,
                disabledMax: r
            }), a && this.triggerEvent("change", {
                value: l
            });
        },
        calculation: function(t, e) {
            var a = this, i = this.data, u = i.disabledMax, n = i.disabledMin, l = i.inputValue, s = i.step, r = i.longpress, o = i.controlled;
            if ("add" === t) {
                if (u) return !1;
                this.updated(l + s, !o, !0);
            }
            if ("sub" === t) {
                if (n) return !1;
                this.updated(l - s, !o, !0);
            }
            r && e && (this.timeout = setTimeout(function() {
                return a.calculation(t, e);
            }, 100));
        },
        bindinput: function(e) {
            var a = this;
            this.clearInputTimer(), this.inputTime = setTimeout(function() {
                var t = toNumberWhenUserInput(e.detail.value);
                a.updated(t, !a.data.controlled), a.triggerEvent("change", {
                    value: t
                });
            }, 300);
        },
        bindfocus: function(t) {
            this.triggerEvent("focus", t.detail);
        },
        bindblur: function(t) {
            this.setData({
                inputValue: this.data.inputValue
            }), this.triggerEvent("blur", t.detail);
        },
        bindlongpress: function(t) {
            var e = t.currentTarget.dataset.type;
            this.data.longpress && this.calculation(e, !0);
        },
        bindtap: function(t) {
            var e = t.currentTarget.dataset.type, a = this.data.longpress;
            (!a || a && !this.timeout) && this.calculation(e, !1);
        },
        bindtouchend: function(t) {
            this.clearTimer();
        },
        touchcancel: function(t) {
            this.clearTimer();
        },
        clearTimer: function() {
            this.timeout && (clearTimeout(this.timeout), this.timeout = null);
        },
        clearInputTimer: function() {
            this.inputTime && (clearTimeout(this.inputTime), this.inputTime = null);
        }
    },
    attached: function() {
        var t = this.data, e = t.defaultValue, a = t.value, i = t.controlled ? a : e;
        this.updated(i);
    },
    detached: function() {
        this.clearTimer(), this.clearInputTimer();
    }
});