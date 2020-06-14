var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
};

Component({
    externalClasses: [ "wux-class" ],
    behaviors: [ "wx://form-field" ],
    relations: {
        "../radio/index": {
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
            type: String,
            value: "",
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
            var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.value, e = this.getRelationNodes("../radio/index");
            0 < e.length && e.forEach(function(e, t) {
                e.changeValue(n === e.data.value, t);
            });
        },
        emitEvent: function(e) {
            this.triggerEvent("change", _extends({}, e, {
                name: this.data.name
            }));
        }
    }
});