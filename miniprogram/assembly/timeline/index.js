Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../timeline-item/index": {
            type: "child",
            linked: function() {
                this.updateIsLastElement();
            },
            linkChanged: function() {
                this.updateIsLastElement();
            },
            unlinked: function() {
                this.updateIsLastElement();
            }
        }
    },
    properties: {
        pending: {
            type: Boolean,
            value: !1
        },
        position: {
            type: String,
            value: "left"
        }
    },
    methods: {
        updateIsLastElement: function() {
            var e = this.getRelationNodes("../timeline-item/index");
            if (0 < e.length) {
                var s = e.length - 1, t = this.data, a = t.pending, l = t.position;
                e.forEach(function(e, t) {
                    var n = a ? t === Math.max(0, s - 1) : t === s, i = a && t === s;
                    e.updateIsLastElement({
                        index: t,
                        isLast: n,
                        isPending: i,
                        pending: a,
                        position: l
                    });
                });
            }
        }
    }
});