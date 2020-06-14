Component({
    externalClasses: [ "wux-class", "wux-class-badge" ],
    properties: {
        count: {
            type: Number,
            value: 0,
            observer: function(e) {
                var t = this.data.overflowCount, a = t <= e ? t + "+" : e;
                this.setData({
                    finalCount: a
                });
            }
        },
        overflowCount: {
            type: Number,
            value: 99
        },
        dot: {
            type: Boolean,
            value: !1
        },
        showZero: {
            type: Boolean,
            value: !1
        },
        status: {
            type: String,
            value: ""
        },
        text: {
            type: String,
            value: ""
        }
    },
    data: {
        finalCount: 0
    }
});