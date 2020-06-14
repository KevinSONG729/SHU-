Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../tabbar/index": {
            type: "parent"
        }
    },
    properties: {
        key: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        disabled: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        width: "100%",
        current: !1,
        index: "0"
    },
    methods: {
        changeCurrent: function(e, t, i, n) {
            var a = 100 / n + "%";
            this.setData({
                width: a,
                current: e,
                theme: i,
                index: t
            });
        },
        onTap: function() {
            var e = this.data, t = e.index, i = e.disabled, n = this.getRelationNodes("../tabbar/index")[0];
            if (i || !n) return !1;
            this.triggerEvent("click", {
                index: t
            }), n.setActiveKey(t);
        }
    }
});