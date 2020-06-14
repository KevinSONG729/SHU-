Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../grids/index": {
            type: "parent"
        }
    },
    properties: {
        thumb: {
            type: String,
            value: ""
        },
        label: {
            type: String,
            value: ""
        }
    },
    data: {
        width: "100%",
        bordered: !0,
        square: !0,
        index: 0
    },
    methods: {
        changeCurrent: function(e, t, i, n) {
            this.setData({
                width: e,
                bordered: t,
                square: i,
                index: n
            });
        },
        onTap: function() {
            this.triggerEvent("click", this.data);
        }
    }
});