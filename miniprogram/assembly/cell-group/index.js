Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../cell/index": {
            type: "child",
            linked: function() {
                this.updateIsLastElement("../cell/index");
            },
            linkChanged: function() {
                this.updateIsLastElement("../cell/index");
            },
            unlinked: function() {
                this.updateIsLastElement("../cell/index");
            }
        }
    },
    properties: {
        title: {
            type: String,
            value: ""
        },
        label: {
            type: String,
            value: ""
        }
    },
    methods: {
        updateIsLastElement: function() {
            var e = this.getRelationNodes("../cell/index");
            if (0 < e.length) {
                var n = e.length - 1;
                e.forEach(function(e, t) {
                    e.updateIsLastElement(t === n);
                });
            }
        }
    }
});