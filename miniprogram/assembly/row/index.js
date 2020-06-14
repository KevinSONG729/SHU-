Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../col/index": {
            type: "child",
            linked: function() {
                this.updateStyle();
            },
            linkChanged: function() {
                this.updateStyle();
            },
            unlinked: function() {
                this.updateStyle();
            }
        }
    },
    properties: {
        gutter: {
            value: 0,
            type: Number,
            observer: "updateStyle"
        }
    },
    data: {
        rowStyle: ""
    },
    methods: {
        updateStyle: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.gutter, e = this.getRelationNodes("../col/index"), i = 0 < t ? "margin-left: " + t / -2 + "px; margin-right: " + t / -2 + "px" : "", n = 0 < t ? "padding-left: " + t / 2 + "px; padding-right: " + t / 2 + "px" : "";
            0 < e.length && e.forEach(function(t) {
                t.updateStyle(n);
            }), this.setData({
                rowStyle: i
            });
        }
    }
});