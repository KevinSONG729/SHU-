Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../tabs/index": {
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
        current: !1,
        scroll: !1
    },
    methods: {
        changeCurrent: function(e, t, a) {
            this.setData({
                current: e,
                scroll: t,
                theme: a
            });
        },
        onTap: function() {
            var e = this.data, t = e.key, a = e.disabled, s = this.getRelationNodes("../tabs/index")[0];
            if (a || !s) return !1;
            this.triggerEvent("click", {
                key: t
            }), s.setActiveKey(t);
        }
    }
});