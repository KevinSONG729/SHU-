Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../cell-group/index": {
            type: "parent"
        }
    },
    data: {
        isLast: !1
    },
    properties: {
        disabled: {
            type: Boolean,
            value: !1
        },
        hoverClass: {
            type: String,
            value: "wux-cell--hover"
        },
        hoverStopPropagation: {
            type: Boolean,
            value: !1
        },
        hoverStartTime: {
            type: Number,
            value: 20
        },
        hoverStayTime: {
            type: Number,
            value: 70
        },
        lang: {
            type: String,
            value: "en"
        },
        sessionFrom: {
            type: String,
            value: ""
        },
        sendMessageTitle: {
            type: String,
            value: ""
        },
        sendMessagePath: {
            type: String,
            value: ""
        },
        sendMessageImg: {
            type: String,
            value: ""
        },
        showMessageCard: {
            type: Boolean,
            value: !1
        },
        appParameter: {
            type: String,
            value: ""
        },
        thumb: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        label: {
            type: String,
            value: ""
        },
        extra: {
            type: String,
            value: ""
        },
        isLink: {
            type: Boolean,
            value: !1
        },
        openType: {
            type: String,
            value: "navigateTo"
        },
        url: {
            type: String,
            value: ""
        },
        delta: {
            type: Number,
            value: 1
        }
    },
    methods: {
        onTap: function() {
            this.data.disabled || (this.triggerEvent("click"), this.linkTo());
        },
        bindgetuserinfo: function(e) {
            this.triggerEvent("getuserinfo", e.detail);
        },
        bindcontact: function(e) {
            this.triggerEvent("contact", e.detail);
        },
        bindgetphonenumber: function(e) {
            this.triggerEvent("getphonenumber", e.detail);
        },
        bindopensetting: function(e) {
            this.triggerEvent("opensetting", e.detail);
        },
        onError: function(e) {
            this.triggerEvent("error", e.detail);
        },
        linkTo: function() {
            var e = this.data, t = e.url, a = e.isLink, n = e.openType, i = e.delta;
            return !!(a && t && [ "navigateTo", "redirectTo", "switchTab", "navigateBack", "reLaunch" ].includes(n)) && ("navigateBack" === n ? wx[n].call(wx, {
                delta: i
            }) : wx[n].call(wx, {
                url: t
            }));
        },
        updateIsLastElement: function(e) {
            this.setData({
                isLast: e
            });
        }
    }
});