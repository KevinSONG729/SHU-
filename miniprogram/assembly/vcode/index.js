var _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var randomNum = function(e, t) {
    return Math.floor(Math.random() * (t - e) + e);
}, randomColor = function(e, t) {
    return "rgb(" + randomNum(e, t) + ", " + randomNum(e, t) + ", " + randomNum(e, t) + ")";
}, render = function(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, a = t.str, r = t.num, o = t.width, n = t.height, i = t.bgColor, l = t.fontColor, u = t.hasPoint, s = t.hasLine, h = "";
    "function" == typeof e.setTextBaseline && e.setTextBaseline("bottom"), e.setFillStyle(i || randomColor(180, 240)), 
    e.fillRect(0, 0, o, n);
    for (var m = 0; m < r; m++) {
        var d = (o - 10) / r * m + 10, v = randomNum(n / 2, n), c = randomNum(-45, 45), f = a[randomNum(0, a.length)], g = randomNum(16, 40), p = parseInt(n / 2);
        h += f, e.setFillStyle(l || randomColor(10, 100)), e.setFontSize(p < g ? p : g), 
        e.translate(d, v), e.rotate(c * Math.PI / 180), e.fillText(f, 0, 0), e.rotate(-c * Math.PI / 180), 
        e.translate(-d, -v);
    }
    if (s) for (var N = 0; N < r; N++) e.setStrokeStyle(randomColor(90, 180)), e.beginPath(), 
    e.moveTo(randomNum(0, o), randomNum(0, n)), e.lineTo(randomNum(0, o), randomNum(0, n)), 
    e.stroke();
    if (u) for (var b = 0; b < 10 * r; b++) e.setFillStyle(randomColor(0, 255)), e.beginPath(), 
    e.arc(randomNum(0, o), randomNum(0, n), 1, 0, 2 * Math.PI), e.fill();
    return h;
};

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    properties: {
        str: {
            type: String,
            value: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        },
        num: {
            type: Number,
            value: 6
        },
        width: {
            type: Number,
            value: 120
        },
        height: {
            type: Number,
            value: 40
        },
        bgColor: {
            type: String,
            value: ""
        },
        fontColor: {
            type: String,
            value: ""
        },
        hasPoint: {
            type: Boolean,
            value: !0
        },
        hasLine: {
            type: Boolean,
            value: !0
        },
        canvasId: {
            type: String,
            value: "wux-vcode"
        }
    },
    methods: {
        draw: function() {
            var e = this, t = this.data, a = t.width, r = t.height, o = t.canvasId;
            this.ctx = this.ctx || wx.createCanvasContext(o, this), this.ctx.clearRect(0, 0, a, r);
            var n = render(this.ctx, this.data);
            this.ctx.draw(!1, function() {
                return e.triggerEvent("change", {
                    value: n
                });
            });
        }
    },
    attached: function() {
        this.draw();
    },
    detached: function() {
        this.ctx = null;
    }
});