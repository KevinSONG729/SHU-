Component({
    externalClasses: [ "wux-class", "wux-hover-class" ],
    properties: {
        type: {
            type: String,
            value: "stable"
        },
        clear: {
            type: Boolean,
            value: !1
        },
        block: {
            type: Boolean,
            value: !1
        },
        full: {
            type: Boolean,
            value: !1
        },
        outline: {
            type: Boolean,
            value: !1
        },
        size: {
            type: String,
            value: "default"
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        loading: {
            type: Boolean,
            value: !1
        },
        formType: {
            type: String,
            value: ""
        },
        openType: {
            type: String,
            value: ""
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
        }
    },
    methods: {
        onTap: function() {
            this.data.disabled || this.data.loading || this.triggerEvent("click");
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
        }
    }
});