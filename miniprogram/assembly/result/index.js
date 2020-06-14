var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
}, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, defaultIcon = {
    type: "success",
    size: 93,
    color: "#33cd5f"
}, getIcon = function(t) {
    return null !== t && "object" === (void 0 === t ? "undefined" : _typeof(t)) ? Object.assign({}, defaultIcon, t) : "string" == typeof t ? Object.assign({}, defaultIcon, {
        type: t
    }) : defaultIcon;
};

Component({
    externalClasses: [ "wux-class" ],
    properties: {
        icon: {
            type: null,
            value: defaultIcon,
            observer: function(t) {
                this.setData({
                    resultIcon: getIcon(t)
                });
            }
        },
        title: {
            type: String,
            value: ""
        },
        label: {
            type: String,
            value: ""
        },
        buttons: {
            type: Array,
            value: []
        },
        extra: {
            type: String,
            value: ""
        },
        fixed: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        onClick: function(t) {
            this.triggerEvent("click", t.currentTarget.dataset);
        },
        bindgetuserinfo: function(t) {
            this.triggerEvent("getuserinfo", _extends({}, t.detail, t.currentTarget.dataset));
        },
        bindcontact: function(t) {
            this.triggerEvent("contact", _extends({}, t.detail, t.currentTarget.dataset));
        },
        bindgetphonenumber: function(t) {
            this.triggerEvent("getphonenumber", _extends({}, t.detail, t.currentTarget.dataset));
        },
        bindopensetting: function(t) {
            this.triggerEvent("opensetting", _extends({}, t.detail, t.currentTarget.dataset));
        },
        onError: function(t) {
            this.triggerEvent("error", _extends({}, t.detail, t.currentTarget.dataset));
        }
    },
    data: {
        resultIcon: null
    },
    attached: function() {
        this.setData({
            resultIcon: getIcon(this.data.icon)
        });
    }
});