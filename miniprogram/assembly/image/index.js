var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, EMPTY = "empty", LOADING = "loading", LOADED = "loaded", ERROR = "error", UNMOUNTED = "unmounted", calcStyle = function(t) {
    return "number" == typeof t ? t + "px" : t;
};

Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        src: {
            type: String,
            value: "",
            observer: function(t) {
                this.updateStatus(t ? LOADING : this.data.unmountOnEmpty ? UNMOUNTED : EMPTY);
            }
        },
        mode: {
            type: String,
            value: "scaleToFill"
        },
        lazyLoad: {
            type: Boolean,
            value: !1
        },
        shape: {
            type: String,
            value: "normal"
        },
        width: {
            type: null,
            value: 300,
            observer: "updateStyle"
        },
        height: {
            type: null,
            value: 225,
            observer: "updateStyle"
        },
        unmountOnEmpty: {
            type: Boolean,
            value: !1
        },
        unmountOnError: {
            type: Boolean,
            value: !1
        },
        empty: {
            type: String,
            value: ""
        },
        loading: {
            type: String,
            value: ""
        },
        error: {
            type: String,
            value: ""
        }
    },
    data: {
        status: ""
    },
    methods: {
        updateStyle: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = Object.assign({}, this.data, t), a = e.width, n = e.height, s = "width: " + calcStyle(a) + "; height: " + calcStyle(n);
            this.setData({
                style: s
            });
        },
        updateStatus: function(t) {
            this.data.status !== t && this.setData({
                status: t
            }), this.triggerEvent("change", {
                status: t
            });
        },
        onLoad: function(t) {
            this.updateStatus(LOADED), this.triggerEvent("load", _extends({}, t.detail, {
                status: LOADED
            }));
        },
        onError: function(t) {
            var e = this.data.unmountOnError ? UNMOUNTED : ERROR;
            this.updateStatus(e), this.triggerEvent("error", _extends({}, t.detail, {
                status: e
            }));
        },
        onTap: function(t) {
            this.triggerEvent("click", _extends({}, t.detail, {
                status: this.data.status
            }));
        }
    },
    attached: function() {
        this.updateStyle(), this.updateStatus(this.data.src ? LOADING : this.data.unmountOnEmpty ? UNMOUNTED : EMPTY);
    }
});