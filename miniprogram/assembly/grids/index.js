Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../grid/index": {
            type: "child",
            linked: function() {
                this.changeCurrent();
            },
            linkChanged: function() {
                this.changeCurrent();
            },
            unlinked: function() {
                this.changeCurrent();
            }
        }
    },
    properties: {
        col: {
            type: Number,
            value: 3,
            observer: "changeCurrent"
        },
        bordered: {
            type: Boolean,
            value: !0,
            observer: "changeCurrent"
        },
        square: {
            type: Boolean,
            value: !1,
            observer: "changeCurrent"
        }
    },
    methods: {
        changeCurrent: function() {
            var e = this.getRelationNodes("../grid/index"), n = this.data, r = n.col, t = n.bordered, a = n.square, o = 100 / (0 < parseInt(r) ? parseInt(r) : 1) + "%";
            0 < e.length && e.forEach(function(e, n) {
                e.changeCurrent(o, t, a, n);
            });
        }
    }
});