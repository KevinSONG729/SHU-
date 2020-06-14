var toAngle = function(t) {
    return t / 180 * Math.PI;
}, percent = function(t) {
    return toAngle(t / 100 * 360);
}, easeInOutCubic = function(t, e, a, n) {
    return (t /= n / 2) < 1 ? a / 2 * t * t * t + e : a / 2 * ((t -= 2) * t * t + 2) + e;
};

Component({
    externalClasses: [ "wux-class" ],
    properties: {
        percent: {
            type: Number,
            value: 0,
            observer: "redraw"
        },
        strokeWidth: {
            type: Number,
            value: 10
        },
        size: {
            type: Number,
            value: 120,
            observer: "updateStyle"
        },
        lineCap: {
            type: String,
            value: "round"
        },
        backgroundColor: {
            type: String,
            value: "#f3f3f3"
        },
        color: {
            type: String,
            value: "#33cd5f"
        },
        sAngle: {
            type: Number,
            value: 0,
            observer: function(t) {
                this.setData({
                    beginAngle: toAngle(t)
                });
            }
        },
        counterclockwise: {
            type: Boolean,
            value: !1
        },
        speed: {
            type: Number,
            value: 2e3
        },
        animate: {
            type: Boolean,
            value: !0
        },
        background: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        beginAngle: 0,
        startAngle: 0,
        endAngle: 0,
        currentAngle: 0
    },
    methods: {
        updateStyle: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.size, e = "width: " + t + "px; height: " + t + "px;";
            this.setData({
                style: e
            });
        },
        redraw: function() {
            var t = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.percent, a = percent(e), n = Date.now(), i = this.data.currentAngle > a, l = i ? this.data.endAngle : this.data.currentAngle;
            this.cancelNextCallback(), this.clearTimer(), this.safeSetData({
                startAngle: l,
                endAngle: a
            }, function() {
                t.animate(n, n, i);
            });
        },
        draw: function() {
            var t = this, e = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0], a = this.data, n = a.lineCap, i = a.backgroundColor, l = a.color, r = a.size, c = a.strokeWidth, s = a.counterclockwise, h = a.background, u = r / 2, o = u - c / 2, d = 2 * Math.PI, g = s ? d - this.data.beginAngle : this.data.beginAngle, b = s ? d - (this.data.beginAngle + this.data.currentAngle) : this.data.beginAngle + this.data.currentAngle;
            this.ctx = this.ctx || wx.createCanvasContext("circle", this), this.ctx.clearRect(0, 0, r, r), 
            h && (this.ctx.beginPath(), this.ctx.arc(u, u, o, 0, 2 * Math.PI), this.ctx.setLineWidth(c), 
            this.ctx.setStrokeStyle(i), this.ctx.stroke()), e && (this.ctx.beginPath(), this.ctx.arc(u, u, o, g, b), 
            this.ctx.setLineWidth(c), this.ctx.setStrokeStyle(l), this.ctx.setLineCap(n), this.ctx.stroke()), 
            this.ctx.draw(!1, function() {
                t.triggerEvent("change", {
                    value: t.data.currentAngle
                });
            });
        },
        animate: function(t, e, a) {
            var n = this, i = Date.now(), l = i - t < 1 ? 1 : i - t, r = this.data, c = r.animate, s = r.speed, h = r.startAngle, u = r.endAngle, o = !a && 1e3 * this.data.currentAngle <= Math.floor(1e3 * u) || a && 1e3 * this.data.currentAngle >= Math.floor(1e3 * u);
            if (c && t - e < 1.05 * s && o) {
                var d = easeInOutCubic((t - e) / l, h, u - h, s / l), g = d < 0 ? 0 : d;
                t = Date.now(), this.safeSetData({
                    currentAngle: g
                }, function() {
                    n.draw(0 !== g), n.timer = setTimeout(function() {
                        return n.animate(t, e, a);
                    }, 1e3 / 60);
                });
            } else this.safeSetData({
                currentAngle: u
            }, function() {
                return n.draw(0 !== u);
            });
        },
        clearTimer: function() {
            this.timer && (clearTimeout(this.timer), this.timer = null);
        },
        safeSetData: function(t, e) {
            e = this.setNextCallback(e), this.setData(t, function() {
                e();
            });
        },
        setNextCallback: function(e) {
            var a = this, n = !0;
            return this.nextCallback = function(t) {
                n && (n = !1, a.nextCallback = null, e.call(a, t));
            }, this.nextCallback.cancel = function() {
                n = !1;
            }, this.nextCallback;
        },
        cancelNextCallback: function() {
            null !== this.nextCallback && (this.nextCallback.cancel(), this.nextCallback = null);
        }
    },
    created: function() {
        this.nextCallback = null;
    },
    attached: function() {
        this.updateStyle(), 0 === this.data.percent && this.draw(!1);
    },
    detached: function() {
        this.ctx = null, this.cancelNextCallback(), this.clearTimer();
    }
});