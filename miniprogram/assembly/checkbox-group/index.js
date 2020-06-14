var _extends = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var t = arguments[n];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
};

Component({
    externalClasses: [ "wux-class" ],
    behaviors: [ "wx://form-field" ],
    relations: {
        "../checkbox/index": {
            type: "child",
            linked: function() {
                this.changeValue();
            },
            linkChanged: function() {
                this.changeValue();
            },
            unlinked: function() {
                this.changeValue();
            }
        }
    },
    properties: {
        value: {
            type: Array,
            value: [],
            observer: "changeValue"
        },
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
        changeValue: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.value, e = this.getRelationNodes("../checkbox/index");
            0 < e.length && e.forEach(function(e, n) {
                e.changeValue(t.includes(e.data.value), n);
            });
        },
        emitEvent: function(e) {
            this.triggerEvent("change", _extends({}, e, {
                name: this.data.name
            }));
        }
    }
});