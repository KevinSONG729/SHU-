Component({
    externalClasses: [ "wux-class" ],
    properties: {
        current: {
            type: Number,
            value: 0,
            observer: "updateCurrent"
        },
        direction: {
            type: String,
            value: "horizontal"
        }
    },
    relations: {
        "../step/index": {
            type: "child",
            linked: function() {
                this.updateCurrent();
            },
            linkChanged: function() {
                this.updateCurrent();
            },
            unlinked: function() {
                this.updateCurrent();
            }
        }
    },
    methods: {
        updateCurrent: function() {
            var n = this.getRelationNodes("../step/index"), e = this.data, r = e.current, i = e.direction;
            0 < n.length && n.forEach(function(e, t) {
                e.updateCurrent({
                    length: n.length,
                    index: t,
                    current: r,
                    direction: i
                });
            });
        }
    }
});