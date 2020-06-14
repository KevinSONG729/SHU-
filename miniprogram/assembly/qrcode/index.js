var _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _index = require("./qr.js/index"), _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var utf16to8 = function(e) {
    for (var t = e.length, r = "", a = 0; a < t; a++) {
        var o = e.charCodeAt(a);
        1 <= o && o <= 127 ? r += e.charAt(a) : (2047 < o ? (r += String.fromCharCode(224 | o >> 12 & 15), 
        r += String.fromCharCode(128 | o >> 6 & 63)) : r += String.fromCharCode(192 | o >> 6 & 31), 
        r += String.fromCharCode(128 | o >> 0 & 63));
    }
    return r;
};

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    properties: {
        typeNumber: {
            type: Number,
            value: -1,
            observer: function(e) {
                this.draw({
                    typeNumber: e
                });
            }
        },
        errorCorrectLevel: {
            type: Number,
            value: 2,
            observer: function(e) {
                this.draw({
                    errorCorrectLevel: e
                });
            }
        },
        width: {
            type: Number,
            value: 200,
            observer: function(e) {
                this.draw({
                    width: e
                });
            }
        },
        height: {
            type: Number,
            value: 200,
            observer: function(e) {
                this.draw({
                    height: e
                });
            }
        },
        fgColor: {
            type: String,
            value: "black",
            observer: function(e) {
                this.draw({
                    fgColor: e
                });
            }
        },
        bgColor: {
            type: String,
            value: "white",
            observer: function(e) {
                this.draw({
                    bgColor: e
                });
            }
        },
        canvasId: {
            type: String,
            value: "wux-qrcode"
        },
        data: {
            type: String,
            value: "",
            observer: function(e) {
                this.draw({
                    data: e
                });
            }
        }
    },
    methods: {
        draw: function() {
            var i = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.assign({}, this.data, e), r = t.typeNumber, a = t.errorCorrectLevel, o = t.width, n = t.height, h = t.fgColor, u = t.bgColor, s = t.canvasId, l = t.data, c = (0, 
            _index2.default)(utf16to8(l), {
                typeNumber: r,
                errorCorrectLevel: a
            }).modules, d = o / c.length, f = n / c.length;
            this.ctx = this.ctx || wx.createCanvasContext(s, this), this.ctx.scale(1, 1), c.forEach(function(e, o) {
                e.forEach(function(e, t) {
                    i.ctx.setFillStyle(e ? h : u);
                    var r = Math.ceil((t + 1) * d) - Math.floor(t * d), a = Math.ceil((o + 1) * f) - Math.floor(o * f);
                    i.ctx.fillRect(Math.round(t * d), Math.round(o * f), r, a);
                });
            }), this.ctx.draw();
        },
        onTap: function() {
            this.triggerEvent("tap");
        }
    },
    attached: function() {
        this.draw();
    },
    detached: function() {
        this.ctx = null;
    }
});