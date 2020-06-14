var prefixCls = "wux-timeline-item";

Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../timeline/index": {
            type: "parent"
        }
    },
    data: {
        isLast: !1,
        isPending: !1,
        pending: !1,
        className: ""
    },
    properties: {
        content: {
            type: String,
            value: ""
        },
        dotStyle: {
            type: String,
            value: ""
        },
        custom: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        updateIsLastElement: function(e) {
            var t = e.index, i = e.isLast, s = e.isPending, n = e.pending, a = e.position, l = "alternate" === a ? t % 2 == 0 ? prefixCls + "--alternate " + prefixCls + "--left" : prefixCls + "--alternate " + prefixCls + "--right" : "right" === a ? prefixCls + "--right" : "";
            this.setData({
                isLast: i,
                isPending: s,
                pending: n,
                className: l
            });
        }
    }
});