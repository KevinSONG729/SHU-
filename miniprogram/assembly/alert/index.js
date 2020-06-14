Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        theme: {
            type: String,
            value: "balanced"
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
        closable: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        visible: !0
    },
    methods: {
        onClose: function() {
            this.data.closable && this.setData({
                visible: !1
            }), this.triggerEvent("click");
        },
        onClick: function() {
            this.triggerEvent("click");
        }
    }
});