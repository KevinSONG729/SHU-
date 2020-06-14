Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        bordered: {
            type: Boolean,
            value: !0
        },
        full: {
            type: Boolean,
            value: !1
        },
        title: {
            type: String,
            value: ""
        },
        thumb: {
            type: String,
            value: ""
        },
        thumbStyle: {
            type: String,
            value: ""
        },
        extra: {
            type: String,
            value: ""
        }
    }
});