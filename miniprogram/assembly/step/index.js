var defaultStatus = [ "wait", "process", "finish", "error" ], defaultIcon = "ios-checkmark";

Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../steps/index": {
            type: "parent"
        }
    },
    properties: {
        status: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        content: {
            type: String,
            value: ""
        },
        icon: {
            type: String,
            value: ""
        }
    },
    data: {
        width: "100%",
        length: 1,
        index: 0,
        current: 0,
        direction: "horizontal"
    },
    methods: {
        updateCurrent: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = "horizontal" === t.direction ? 100 / t.length + "%" : "100%", a = defaultStatus.indexOf(this.data.status), n = t.index < t.current || this.data.icon, i = this.data.icon || defaultIcon, s = "wux-step--" + (-1 !== a ? defaultStatus[a] : t.index < t.current ? "finish" : t.index === t.current ? "process" : ""), r = Object.assign({
                width: e,
                className: s,
                hasIcon: n,
                thumb: i
            }, t);
            this.setData(r);
        }
    },
    attached: function() {
        this.updateCurrent(this.data);
    }
});