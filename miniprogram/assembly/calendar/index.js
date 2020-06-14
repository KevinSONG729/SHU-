var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
}, _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _mergeOptionsToData = require("../helpers/mergeOptionsToData"), _mergeOptionsToData2 = _interopRequireDefault(_mergeOptionsToData);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
        return n;
    }
    return Array.from(t);
}

var defaults = {
    monthNames: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
    monthNamesShort: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
    dayNames: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
    dayNamesShort: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
    firstDay: 1,
    weekendDays: [ 0, 6 ],
    multiple: !1,
    dateFormat: "yyyy-mm-dd",
    direction: "horizontal",
    minDate: null,
    maxDate: null,
    touchMove: !0,
    animate: !0,
    closeOnSelect: !0,
    weekHeader: !0,
    toolbar: !0,
    value: [],
    onMonthAdd: function() {},
    onChange: function() {},
    onOpen: function() {},
    onClose: function() {},
    onDayClick: function() {},
    onMonthYearChangeStart: function() {},
    onMonthYearChangeEnd: function() {}
}, getTouchPosition = function(t) {
    var e = t.touches[0] || t.changedTouches[0];
    return {
        x: e.pageX,
        y: e.pageY
    };
}, getTransform = function(t, e) {
    return "transform: translate3d(" + (e ? t : 0) + "%, " + (e ? 0 : t) + "%, 0)";
}, isSameDate = function(t, e) {
    var n = new Date(t), a = new Date(e);
    return n.getFullYear() === a.getFullYear() && n.getMonth() === a.getMonth() && n.getDate() === a.getDate();
};

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    data: (0, _mergeOptionsToData2.default)(defaults),
    methods: {
        open: function() {
            var t = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, n = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, e));
            this.monthsTranslate = 0, this.isH = "horizontal" === n.direction, this.$$setData(_extends({
                in: !0
            }, n)).then(function() {
                return t.init();
            }), this.setValue(n.value), "function" == typeof this.fns.onOpen && this.fns.onOpen.call(this);
        },
        close: function() {
            this.$$setData({
                in: !1
            }), "function" == typeof this.fns.onClose && this.fns.onClose.call(this);
        },
        init: function() {
            var e = this, t = this.setWeekHeader(), n = this.setMonthsHTML(), a = this.setMonthsTranslate();
            return "function" == typeof this.fns.onMonthAdd && n.forEach(function(t) {
                return e.fns.onMonthAdd.call(e, t);
            }), this.$$setData({
                weeks: t,
                months: n,
                monthsTranslate: a,
                wrapperTranslate: ""
            }).then(function() {
                return e.$$setData(_extends({}, e.updateCurrentMonthYear()));
            });
        },
        setMonthsTranslate: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.monthsTranslate, e = 100 * -t, n = 100 * -(t - 1);
            return [ getTransform(100 * -(t + 1), this.isH), getTransform(e, this.isH), getTransform(n, this.isH) ];
        },
        updateCurrentMonthYear: function(t) {
            var e = this.data, n = e.months, a = e.monthNames;
            if (void 0 === t) {
                var s = parseInt(n[1].month, 10);
                return {
                    currentMonth: s,
                    currentYear: parseInt(n[1].year, 10),
                    currentMonthName: a[s]
                };
            }
            var r = parseInt(n["next" === t ? n.length - 1 : 0].month, 10);
            return {
                currentMonth: r,
                currentYear: parseInt(n["next" === t ? n.length - 1 : 0].year, 10),
                currentMonthName: a[r]
            };
        },
        onTouchStart: function(t) {
            if (!this.data.touchMove || this.isMoved || this.isRendered) return !1;
            this.start = getTouchPosition(t), this.move = {}, this.touchesDiff = 0, this.allowItemClick = !0, 
            this.isMoved = !1;
        },
        onTouchMove: function(i) {
            var h = this;
            if (!this.data.touchMove || this.isRendered) return !1;
            this.allowItemClick = !1, this.isMoved || (this.isMoved = !0);
            var t = wx.createSelectorQuery().in(this);
            t.select(".wux-calendar__months-content").boundingClientRect(function(t) {
                if (!t || !h.isMoved) return !1;
                h.move = getTouchPosition(i), h.touchesDiff = h.isH ? h.move.x - h.start.x : h.move.y - h.start.y;
                var e = t.width, n = t.height, a = h.touchesDiff / (h.isH ? e : n), s = 100 * (h.monthsTranslate + a), r = getTransform(s, h.isH);
                h.$$setData({
                    wrapperTranslate: "transition-duration: 0s; " + r
                });
            }), t.exec();
        },
        onTouchEnd: function() {
            var t = this;
            if (!this.data.touchMove || !this.isMoved || this.isRendered) return !1;
            this.isMoved = !1, Math.abs(this.touchesDiff) < 30 ? this.resetMonth() : 30 <= this.touchesDiff ? this.prevMonth() : this.nextMonth(), 
            setTimeout(function() {
                return t.allowItemClick = !0;
            }, 100);
        },
        onDayClick: function(t) {
            if (this.allowItemClick) {
                var e = t.currentTarget.dataset, n = e.year, a = e.month, s = e.day, r = e.type;
                if (r.selected && !this.data.multiple) return !1;
                if (r.disabled) return !1;
                r.next && this.nextMonth(), r.prev && this.prevMonth(), "function" == typeof this.fns.onDayClick && this.fns.onDayClick.call(this, n, a, s), 
                this.addValue(new Date(n, a, s).getTime()), this.data.closeOnSelect && !this.data.multiple && this.close();
            }
        },
        resetMonth: function() {
            var t = 100 * this.monthsTranslate, e = getTransform(t, this.isH);
            this.$$setData({
                wrapperTranslate: "transition-duration: 0s; " + e
            });
        },
        setYearMonth: function() {
            var t = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.currentYear, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.data.currentMonth, a = this.data, s = a.months, r = a.monthsTranslate, i = a.maxDate, h = a.minDate, o = a.currentYear, u = a.currentMonth, l = e < o ? new Date(e, n + 1, -1).getTime() : new Date(e, n).getTime();
            if (i && l > new Date(i).getTime()) return !1;
            if (h && l < new Date(h).getTime()) return !1;
            var d = new Date(o, u).getTime(), m = d < l ? "next" : "prev", f = this.monthHTML(new Date(e, n)), c = this.monthsTranslate = this.monthsTranslate || 0;
            if (d < l) {
                this.monthsTranslate = this.monthsTranslate - 1;
                var g = getTransform(100 * -(c - 1), this.isH);
                this.$$setData({
                    months: [ s[1], s[2], f ],
                    monthsTranslate: [ r[1], r[2], g ]
                });
            } else {
                this.monthsTranslate = this.monthsTranslate + 1;
                var v = getTransform(100 * -(c + 1), this.isH);
                this.$$setData({
                    months: [ f, s[0], s[1] ],
                    monthsTranslate: [ v, r[0], r[1] ]
                });
            }
            this.onMonthChangeStart(m);
            var D = getTransform(100 * this.monthsTranslate, this.isH), T = this.data.animate ? .3 : 0, p = "transition-duration: " + T + "s; " + D;
            this.$$setData({
                wrapperTranslate: p
            }), setTimeout(function() {
                return t.onMonthChangeEnd(m, !0);
            }, T);
        },
        nextYear: function() {
            this.setYearMonth(this.data.currentYear + 1);
        },
        prevYear: function() {
            this.setYearMonth(this.data.currentYear - 1);
        },
        nextMonth: function() {
            var t = this, e = this.data, n = e.months, a = e.monthsTranslate, s = e.maxDate, r = e.currentMonth, i = parseInt(n[n.length - 1].month, 10), h = parseInt(n[n.length - 1].year, 10), o = new Date(h, i).getTime();
            if (s && o > new Date(s).getTime()) return this.resetMonth();
            if (this.monthsTranslate = this.monthsTranslate - 1, i === r) {
                var u = 100 * -this.monthsTranslate, l = this.monthHTML(o, "next"), d = getTransform(u, this.isH), m = [ this.data.months[1], this.data.months[2], l ];
                this.$$setData({
                    months: m,
                    monthsTranslate: [ a[1], a[2], d ]
                }), "function" == typeof this.fns.onMonthAdd && this.fns.onMonthAdd.call(this, m[m.length - 1]);
            }
            this.onMonthChangeStart("next");
            var f = getTransform(100 * this.monthsTranslate, this.isH), c = this.data.animate ? .3 : 0, g = "transition-duration: " + c + "s; " + f;
            this.$$setData({
                wrapperTranslate: g
            }), setTimeout(function() {
                return t.onMonthChangeEnd("next");
            }, c);
        },
        prevMonth: function() {
            var t = this, e = this.data, n = e.months, a = e.monthsTranslate, s = e.minDate, r = e.currentMonth, i = parseInt(n[0].month, 10), h = parseInt(n[0].year, 10), o = new Date(h, i + 1, -1).getTime();
            if (s && o < new Date(s).getTime()) return this.resetMonth();
            if (this.monthsTranslate = this.monthsTranslate + 1, i === r) {
                var u = 100 * -this.monthsTranslate, l = this.monthHTML(o, "prev"), d = getTransform(u, this.isH), m = [ l, this.data.months[0], this.data.months[1] ];
                this.$$setData({
                    months: m,
                    monthsTranslate: [ d, a[0], a[1] ]
                }), "function" == typeof this.fns.onMonthAdd && this.fns.onMonthAdd.call(this, m[0]);
            }
            this.onMonthChangeStart("prev");
            var f = getTransform(100 * this.monthsTranslate, this.isH), c = this.data.animate ? .3 : 0, g = "transition-duration: " + c + "s; " + f;
            this.$$setData({
                wrapperTranslate: g
            }), setTimeout(function() {
                return t.onMonthChangeEnd("prev");
            }, c);
        },
        onMonthChangeStart: function(t) {
            var e = this.updateCurrentMonthYear(t);
            this.$$setData(e), "function" == typeof this.fns.onMonthYearChangeStart && this.fns.onMonthYearChangeStart.call(this, e.currentYear, e.currentMonth);
        },
        onMonthChangeEnd: function() {
            var t = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "next", n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], a = this.data, s = a.currentYear, r = a.currentMonth, i = void 0, h = void 0, o = void 0, u = [].concat(_toConsumableArray(this.data.months));
            n ? (h = this.monthHTML(new Date(s, r), "prev"), i = this.monthHTML(new Date(s, r), "next"), 
            u = [ h, u["next" === e ? u.length - 1 : 0], i ]) : (o = this.monthHTML(new Date(s, r), e), 
            "next" === e ? u = [ u[1], u[2], o ] : "prev" === e && (u = [ o, u[0], u[1] ]));
            var l = this.setMonthsTranslate(this.monthsTranslate);
            this.isRendered = !0, this.$$setData({
                months: u,
                monthsTranslate: l
            }).then(function() {
                return t.isRendered = !1;
            }), "function" == typeof this.fns.onMonthAdd && this.fns.onMonthAdd.call(this, "next" === e ? u[u.length - 1] : u[0]), 
            "function" == typeof this.fns.onMonthYearChangeEnd && this.fns.onMonthYearChangeEnd.call(this, s, r);
        },
        setWeekHeader: function() {
            var t = this.data, e = t.weekHeader, n = t.firstDay, a = t.dayNamesShort, s = t.weekendDays, r = [];
            if (e) for (var i = 0; i < 7; i++) {
                var h = 6 < i + n ? i - 7 + n : i + n, o = a[h], u = 0 <= s.indexOf(h);
                r.push({
                    weekend: u,
                    dayName: o
                });
            }
            return r;
        },
        daysInMonth: function(t) {
            var e = new Date(t);
            return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
        },
        monthHTML: function(t, e) {
            var n = (t = new Date(t)).getFullYear(), a = t.getMonth(), s = t.getTime(), r = {
                year: n,
                month: a,
                time: s,
                items: []
            };
            "next" === e && (t = 11 === a ? new Date(n + 1, 0) : new Date(n, a + 1, 1)), "prev" === e && (t = 0 === a ? new Date(n - 1, 11) : new Date(n, a - 1, 1)), 
            "next" !== e && "prev" !== e || (a = t.getMonth(), n = t.getFullYear(), s = t.getTime());
            var i = this.daysInMonth(new Date(t.getFullYear(), t.getMonth()).getTime() - 864e6), h = this.daysInMonth(t), o = new Date(t.getFullYear(), t.getMonth()).getDay();
            0 === o && (o = 7);
            var u = void 0, l = [], d = this.data.firstDay - 1 + 0, m = new Date().setHours(0, 0, 0, 0), f = this.data.minDate ? new Date(this.data.minDate).getTime() : null, c = this.data.maxDate ? new Date(this.data.maxDate).getTime() : null;
            if (this.data.value && this.data.value.length) for (var g = 0; g < this.data.value.length; g++) l.push(new Date(this.data.value[g]).setHours(0, 0, 0, 0));
            for (var v = 1; v <= 6; v++) {
                for (var D = [], T = 1; T <= 7; T++) {
                    var p = T, M = ++d - o, y = {};
                    M < 0 ? (M = i + M + 1, y.prev = !0, u = new Date(a - 1 < 0 ? n - 1 : n, a - 1 < 0 ? 11 : a - 1, M).getTime()) : h < (M += 1) ? (M -= h, 
                    y.next = !0, u = new Date(11 < a + 1 ? n + 1 : n, 11 < a + 1 ? 0 : a + 1, M).getTime()) : u = new Date(n, a, M).getTime(), 
                    u === m && (y.today = !0), 0 <= l.indexOf(u) && (y.selected = !0), 0 <= this.data.weekendDays.indexOf(p - 1) && (y.weekend = !0), 
                    (f && u < f || c && c < u) && (y.disabled = !0);
                    var w = (u = new Date(u)).getFullYear(), x = u.getMonth();
                    D.push({
                        type: y,
                        year: w,
                        month: x,
                        day: M,
                        date: w + "-" + (x + 1) + "-" + M
                    });
                }
                r.year = n, r.month = a, r.time = s, r.items.push(D);
            }
            return r;
        },
        setMonthsHTML: function() {
            var t = this.data.value && this.data.value.length ? this.data.value[0] : new Date().setHours(0, 0, 0, 0);
            return [ this.monthHTML(t, "prev"), this.monthHTML(t), this.monthHTML(t, "next") ];
        },
        formatDate: function(t) {
            var e = (t = new Date(t)).getFullYear(), n = t.getMonth(), a = n + 1, s = t.getDate(), r = t.getDay();
            return this.data.dateFormat.replace(/yyyy/g, e).replace(/yy/g, (e + "").substring(2)).replace(/mm/g, a < 10 ? "0" + a : a).replace(/m/g, a).replace(/MM/g, this.data.monthNames[n]).replace(/M/g, this.data.monthNamesShort[n]).replace(/dd/g, s < 10 ? "0" + s : s).replace(/d/g, s).replace(/DD/g, this.data.dayNames[r]).replace(/D/g, this.data.dayNamesShort[r]);
        },
        addValue: function(t) {
            if (this.data.multiple) {
                for (var e = this.data.value || [], n = -1, a = 0; a < e.length; a++) isSameDate(t, e[a]) && (n = a);
                -1 === n ? e.push(t) : e.splice(n, 1), this.setValue(e);
            } else this.setValue([ t ]);
        },
        setValue: function(t) {
            var e = this;
            this.$$setData({
                value: t
            }).then(function() {
                return e.updateValue();
            });
        },
        updateValue: function() {
            var n = this, h = {};
            this.data.months.forEach(function(t, a) {
                t.items.forEach(function(t, n) {
                    t.forEach(function(t, e) {
                        t.type.selected && (h["months[" + a + "].items[" + n + "][" + e + "].type.selected"] = !1);
                    });
                });
            });
            for (var t = function(t) {
                var e = new Date(n.data.value[t]), s = e.getFullYear(), r = e.getMonth(), i = e.getDate();
                n.data.months.forEach(function(t, a) {
                    t.year === s && t.month === r && t.items.forEach(function(t, n) {
                        t.forEach(function(t, e) {
                            t.year === s && t.month === r && t.day === i && (h["months[" + a + "].items[" + n + "][" + e + "].type.selected"] = !0);
                        });
                    });
                });
            }, e = 0; e < this.data.value.length; e++) t(e);
            this.$$setData(h), "function" == typeof this.fns.onChange && this.fns.onChange.call(this, this.data.value, this.data.value.map(function(t) {
                return n.formatDate(t);
            }));
        }
    }
});