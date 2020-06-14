var _slicedToArray = function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, e) {
        var o = [], l = !0, r = !1, i = void 0;
        try {
            for (var n, p = t[Symbol.iterator](); !(l = (n = p.next()).done) && (o.push(n.value), 
            !e || o.length !== e); l = !0) ;
        } catch (t) {
            r = !0, i = t;
        } finally {
            try {
                !l && p.return && p.return();
            } finally {
                if (r) throw i;
            }
        }
        return o;
    }(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, getPlacements = function() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : rects, e = _slicedToArray(t, 3), o = e[0], l = e[1], r = e[2];
    switch (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") {
      case "topLeft":
        return {
            top: l.scrollTop + o.top - r.height - 4,
            left: l.scrollLeft + o.left
        };

      case "top":
        return {
            top: l.scrollTop + o.top - r.height - 4,
            left: l.scrollLeft + o.left + (o.width - r.width) / 2
        };

      case "topRight":
        return {
            top: l.scrollTop + o.top - r.height - 4,
            left: l.scrollLeft + o.left + o.width - r.width
        };

      case "rightTop":
        return {
            top: l.scrollTop + o.top,
            left: l.scrollLeft + o.left + o.width + 4
        };

      case "right":
        return {
            top: l.scrollTop + o.top + (o.height - r.height) / 2,
            left: l.scrollLeft + o.left + o.width + 4
        };

      case "rightBottom":
        return {
            top: l.scrollTop + o.top + o.height - r.height,
            left: l.scrollLeft + o.left + o.width + 4
        };

      case "bottomRight":
        return {
            top: l.scrollTop + o.top + o.height + 4,
            left: l.scrollLeft + o.left + o.width - r.width
        };

      case "bottom":
        return {
            top: l.scrollTop + o.top + o.height + 4,
            left: l.scrollLeft + o.left + (o.width - r.width) / 2
        };

      case "bottomLeft":
        return {
            top: l.scrollTop + o.top + o.height + 4,
            left: l.scrollLeft + o.left
        };

      case "leftBottom":
        return {
            top: l.scrollTop + o.top + o.height - r.height,
            left: l.scrollLeft + o.left - r.width - 4
        };

      case "left":
        return {
            top: l.scrollTop + o.top + (o.height - r.height) / 2,
            left: l.scrollLeft + o.left - r.width - 4
        };

      case "leftTop":
        return {
            top: l.scrollTop + o.top,
            left: l.scrollLeft + o.left - r.width - 4
        };

      default:
        return {
            left: 0,
            top: 0
        };
    }
};

Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        theme: {
            type: String,
            value: "light"
        },
        title: {
            type: String,
            value: ""
        },
        content: {
            type: String,
            value: ""
        },
        placement: {
            type: String,
            value: "top"
        },
        trigger: {
            type: String,
            value: "click"
        },
        bodyStyle: {
            type: String,
            value: "",
            observer: function(t) {
                var e = t.trim(), o = e ? e.split(";").filter(function(t) {
                    return !!t;
                }) : [];
                this.setData({
                    popoverBodyStyle: o.join(";")
                });
            }
        },
        defaultVisible: {
            type: Boolean,
            value: !1
        },
        visible: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                this.data.controlled && this.setData({
                    popoverVisible: t
                });
            }
        },
        controlled: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        popoverStyle: "",
        popoverBodyStyle: "",
        popoverVisible: !1
    },
    methods: {
        getPopoverStyle: function() {
            var r = this, t = wx.createSelectorQuery().in(this);
            t.select(".wux-popover__element").boundingClientRect(), t.selectViewport().scrollOffset(), 
            t.select(".wux-popover").boundingClientRect(), t.exec(function(t) {
                if (t.filter(function(t) {
                    return !t;
                }).length) return !1;
                var e = r.data.popoverBodyStyle ? r.data.popoverBodyStyle.split(";") : [], o = getPlacements(t, r.data.placement);
                for (var l in o) e.push(l + ": " + o[l] + "px");
                r.setData({
                    popoverStyle: e.join(";")
                });
            });
        },
        onEnter: function() {
            this.getPopoverStyle();
        },
        fireEvents: function() {
            var t = this.data, e = !t.popoverVisible;
            t.controlled || this.setData({
                popoverVisible: e
            }), this.triggerEvent("change", {
                visible: e
            });
        },
        onClick: function() {
            "click" === this.data.trigger && this.fireEvents();
        }
    },
    attached: function() {
        var t = this.data, e = t.popoverBodyStyle, o = t.defaultVisible, l = t.visible, r = t.controlled ? l : o;
        this.setData({
            popoverVisible: r,
            popoverStyle: e
        });
    }
});