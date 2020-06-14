var _defaults, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
}, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _mergeOptionsToData = require("../helpers/mergeOptionsToData"), _mergeOptionsToData2 = _interopRequireDefault(_mergeOptionsToData), _gestures = require("../helpers/gestures");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var defaults = (_defineProperty(_defaults = {
    indicatorDots: !1,
    indicatorColor: "rgba(0, 0, 0, .3)",
    indicatorActiveColor: "#000000",
    autoplay: !1,
    interval: 5e3,
    duration: 500,
    circular: !1,
    vertical: !1,
    showDelete: !0,
    allowScale: !0,
    current: 0,
    urls: []
}, "delete", function() {}), _defineProperty(_defaults, "cancel", function() {}), 
_defineProperty(_defaults, "onChange", function() {}), _defineProperty(_defaults, "onTap", function() {
    return !0;
}), _defaults), MIN_RATIO = 1, MAX_RATIO = 1.2, defaultTouchOptions = {
    scale: 1,
    offset: [ .5, 3 ]
}, getImages = function() {
    return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : []).map(function(t) {
        return "object" !== (void 0 === t ? "undefined" : _typeof(t)) ? {
            image: t,
            remark: "",
            touch: _extends({}, defaultTouchOptions)
        } : _extends({}, t, {
            touch: _extends({}, defaultTouchOptions)
        });
    });
};

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    data: (0, _mergeOptionsToData2.default)(defaults),
    methods: {
        hide: function() {
            this.$$setData({
                in: !1
            }), "function" == typeof this.fns.cancel && this.fns.cancel();
        },
        show: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, t, {
                images: getImages(t.urls)
            }));
            this.$$setData(_extends({
                in: !0
            }, e));
        },
        onTap: function(t) {
            if (this.allowItemClick) {
                var e = t.currentTarget.dataset.index;
                !0 === this.fns.onTap(e, this.data.urls) && this.hide();
            }
        },
        onTouchStart: function(t) {
            if (this.allowItemClick = !0, !this.data.allowScale || 1 === (0, _gestures.getPointsNumber)(t) || this.touching) return !1;
            var e = (0, _gestures.getTouchPoints)(t), n = (0, _gestures.getTouchPoints)(t, 1), i = (0, 
            _gestures.getPointsDistance)(e, n);
            this.touching = !1, this.prevDistance = i, this.$$setData({
                transition: "none"
            });
        },
        onTouchMove: function(t) {
            var e = this;
            if (!this.data.allowScale || 1 === (0, _gestures.getPointsNumber)(t) || this.isRendered) return !1;
            var n = (0, _gestures.getTouchPoints)(t), i = (0, _gestures.getTouchPoints)(t, 1), s = (0, 
            _gestures.getPointsDistance)(n, i), r = t.currentTarget.dataset, o = r.touch, a = r.index, u = s - this.prevDistance, c = o.scale + .005 * u;
            if (a !== this.data.current) return !1;
            c <= o.offset[0] * MIN_RATIO ? c = o.offset[0] * MIN_RATIO : c >= o.offset[1] * MAX_RATIO && (c = o.offset[1] * MAX_RATIO);
            var l = _defineProperty({}, "images[" + a + "].touch.scale", c);
            this.touching || (this.touching = !0), this.prevDistance = s, this.allowItemClick = !1, 
            this.isRendered = !0, this.$$setData(l).then(function() {
                return e.isRendered = !1;
            });
        },
        onTouchEnd: function(t) {
            var e, n = this;
            if (!this.data.allowScale || !this.touching) return !1;
            var i = t.currentTarget.dataset, s = i.touch, r = i.index, o = s.scale;
            o <= 1 ? o = 1 : o >= s.offset[1] * MAX_RATIO && (o = s.offset[1]);
            var a = (_defineProperty(e = {}, "images[" + r + "].touch.scale", o), _defineProperty(e, "transition", "transform .3s"), 
            e);
            this.touching = !1, this.$$setData(a).then(function() {
                setTimeout(function() {
                    return n.allowItemClick = !0;
                }, 400);
            });
        },
        onDelete: function(t) {
            "function" == typeof this.fns.delete && !0 === this.fns.delete(this.data.current, this.data.urls) && this.hide();
        },
        onChange: function(t) {
            this.$$setData({
                current: t.detail.current
            }), "function" == typeof this.fns.onChange && this.fns.onChange.call(this, t);
        },
        slideTo: function() {
            var t = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, i = this.data, s = i.urls, r = i.circular, o = s.length - 1;
            return e < 0 ? e = r ? o : 0 : o < e && (e = r ? 0 : o), 0 < n ? this.$$requestAnimationFrame(function() {
                return t.$$setData({
                    current: e
                });
            }, n) : this.$$setData({
                current: e
            });
        },
        slideNext: function(t) {
            return this.slideTo(this.data.current + 1, t);
        },
        slidePrev: function(t) {
            return this.slideTo(this.data.current - 1, t);
        }
    }
});