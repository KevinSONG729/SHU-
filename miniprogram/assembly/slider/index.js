var _gestures = require("../helpers/gestures");

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var getPrecision = function(t) {
    var e = t.toString();
    return 0 <= e.indexOf(".") ? e.length - e.indexOf(".") - 1 : 0;
}, checkValuePrecision = function(t, e, a) {
    var r = Math.round((t - a) / e) * e + a, s = getPrecision(e);
    return parseFloat(r.toFixed(s));
};

Component({
    externalClasses: [ "wux-class" ],
    properties: {
        min: {
            type: Number,
            value: 0,
            observer: "getMarks"
        },
        max: {
            type: Number,
            value: 100,
            observer: "getMarks"
        },
        step: {
            type: Number,
            value: 1,
            observer: "getMarks"
        },
        defaultValue: {
            type: Array,
            value: [ 0 ]
        },
        value: {
            type: Array,
            value: [ 0 ],
            observer: function(t) {
                this.data.controlled && this.updated(t);
            }
        },
        controlled: {
            type: Boolean,
            value: !1
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        showMark: {
            type: Boolean,
            value: !1
        },
        showValue: {
            type: [ Boolean, Object ],
            value: !1
        },
        markStyle: {
            type: [ String, Array ],
            value: ""
        },
        handleStyle: {
            type: [ String, Array ],
            value: ""
        },
        trackStyle: {
            type: [ String, Array ],
            value: ""
        },
        railStyle: {
            type: String,
            value: ""
        },
        wrapStyle: {
            type: String,
            value: ""
        }
    },
    data: {
        offsets: [],
        sliderValue: []
    },
    methods: {
        updated: function(t) {
            var e = this, a = t.map(function(t) {
                return e.calcOffset(e.checkValue(t));
            });
            this.setData({
                offsets: a,
                sliderValue: t
            });
        },
        onTouchStart: function(t) {
            if (!(this.data.disabled || 1 < (0, _gestures.getPointsNumber)(t))) {
                var e = t.currentTarget.dataset.index;
                this.isMoved = !1, this.startX = (0, _gestures.getTouchPoints)(t).x, this.moveX = 0, 
                this.startPos = this.data.offsets[e] || 0, this.setData({
                    last: e
                });
            }
        },
        onTouchMove: function(t) {
            var l = this;
            if (!(this.data.disabled || 1 < (0, _gestures.getPointsNumber)(t))) {
                var c = t.currentTarget.dataset.index;
                this.isMoved = !0, this.moveX = (0, _gestures.getTouchPoints)(t).x, this.getRect(".wux-slider__rail").then(function(t) {
                    if (t && l.isMoved) {
                        var e = (l.moveX - l.startX) / t.width * (l.data.max - l.data.min), a = [].concat(_toConsumableArray(l.data.offsets)), r = l.checkValue(l.startPos + e, 0, 100), s = l.data.sliderValue, i = l.calcValue(r), n = s[c - 1], u = s[c + 1];
                        if (a[c] = l.calcOffset(i), n && i < n && (a[c] = l.calcOffset(n)), u && u < i && (a[c] = l.calcOffset(u)), 
                        s[c] !== i) {
                            var o = l.getValue(a);
                            l.data.controlled || l.setData({
                                offsets: a,
                                sliderValue: o
                            }), l.triggerEvent("change", {
                                offsets: a,
                                value: o
                            });
                        }
                    }
                });
            }
        },
        onTouchEnd: function(t) {
            if (!(this.data.disabled || 1 < (0, _gestures.getPointsNumber)(t))) {
                this.isMoved = !1;
                var e = this.data.offsets, a = this.getValue(e);
                this.triggerEvent("afterChange", {
                    offsets: e,
                    value: a
                });
            }
        },
        getRect: function(t, a) {
            var r = this;
            return new Promise(function(e) {
                wx.createSelectorQuery().in(r)[a ? "selectAll" : "select"](t).boundingClientRect(function(t) {
                    a && Array.isArray(t) && t.length && e(t), !a && t && e(t);
                }).exec();
            });
        },
        calcValue: function(t) {
            var e = this.data, a = e.min, r = e.max;
            return this.trimValue(t * (r - a) / 100 + a);
        },
        calcOffset: function(t) {
            var e = this.data, a = e.min;
            return 100 * ((t - a) / (e.max - a));
        },
        checkValue: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.data.min, a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : this.data.max;
            return t <= e ? e : a <= t ? a : t;
        },
        trimValue: function(t) {
            return checkValuePrecision(this.checkValue(t), this.data.step, this.data.min);
        },
        getValue: function() {
            var e = this;
            return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.offsets).map(function(t) {
                return e.calcValue(t);
            });
        },
        getMarks: function() {
            if (this.data.showMark) {
                for (var t = this.data, e = t.min, a = t.max, r = t.step, s = (a - e) / r, i = [], n = 100 * r / (a - e), u = 1; u < s; u++) i.push(u * n);
                this.setData({
                    marks: i
                });
            }
        }
    },
    attached: function() {
        var t = this.data, e = t.defaultValue, a = t.value, r = t.controlled ? a : e;
        this.updated(r), this.getMarks();
    }
});