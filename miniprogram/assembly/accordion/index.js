Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../accordion-group/index": {
            type: "parent"
        }
    },
    properties: {
        key: {
            type: String,
            value: ""
        },
        thumb: {
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
        disabled: {
            type: Boolean,
            value: !1
        },
        showArrow: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        current: !1,
        index: "0"
    },
    methods: {
        changeCurrent: function(e, t) {
            this.setData({
                current: e,
                index: t
            });
        },
        onTap: function() {
            var e = this.data, t = e.index, n = e.disabled, a = this.getRelationNodes("../accordion-group/index")[0];
            if (n || !a) return !1;
            a.onClickItem(t);
        }
    }
});