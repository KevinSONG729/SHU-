Component({
    externalClasses: [ "wux-class" ],
    relations: {
        "../row/index": {
            type: "parent"
        }
    },
    properties: {
        span: {
            value: 0,
            type: Number
        },
        offset: {
            value: 0,
            type: Number
        },
        pull: {
            value: 0,
            type: Number
        },
        push: {
            value: 0,
            type: Number
        }
    },
    data: {
        colStyle: ""
    },
    methods: {
        updateStyle: function(e) {
            this.data.colStyle !== e && this.setData({
                colStyle: e
            });
        }
    }
});