Component({
    externalClasses: [ "wux-class" ],
    properties: {
        tip: {
            type: String,
            value: ""
        },
        size: {
            type: String,
            value: "default"
        },
        spinning: {
            type: Boolean,
            value: !0,
            observer: "updated"
        },
        nested: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        spinVisible: !0
    },
    methods: {
        updated: function(e) {
            this.data.nested && this.setData({
                spinVisible: e
            });
        }
    }
});