var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var A = arguments[e];
        for (var n in A) Object.prototype.hasOwnProperty.call(A, n) && (t[n] = A[n]);
    }
    return t;
}, defaultAction = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAQLCR5MtjrbAAAAjUlEQVRo3u3ZMRKAIAxEUbDirp4nXnctFFDHBtDQ/O1Nnk6aHUMgZCBKMkmmNAtgOmL9M+IQQGVM95zljy8DAAAAAAAAAAAAAACALsDZcppSx7Q+WdtUvA5xffUtrjeA8/qQ21S9gc15/3Nfzw0M5O0G2kM5BQAAAAAAAAAAAAAAQGk33q0qZ/p/Q/JFdmei9usomnwIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjA5OjMwKzA4OjAw1U4c3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTowOTozMCswODowMKQTpGMAAAAASUVORK5CYII=";

Component({
    externalClasses: [ "wux-class" ],
    properties: {
        theme: {
            type: String,
            value: "balanced"
        },
        position: {
            type: String,
            value: "bottomRight"
        },
        action: {
            type: String,
            value: defaultAction
        },
        actionRotate: {
            type: Boolean,
            value: !0
        },
        backdrop: {
            type: Boolean,
            value: !1
        },
        buttons: {
            type: Array,
            value: []
        },
        defaultVisible: {
            type: Boolean,
            value: !1
        },
        visible: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                this.data.controlled && this.setData({
                    buttonVisible: t
                });
            }
        },
        controlled: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        onChange: function(t) {
            this.data.buttonVisible !== t && (this.data.controlled || this.setData({
                buttonVisible: t
            })), this.triggerEvent("change", {
                value: t
            });
        },
        onToggle: function() {
            this.onChange(!this.data.buttonVisible);
        },
        onTap: function(t) {
            var e = t.currentTarget.dataset, A = e.index, n = e.value, a = {
                index: A,
                value: n,
                buttons: this.data.buttons
            };
            n.disabled || (this.triggerEvent("click", a), this.onChange(!1));
        },
        bindgetuserinfo: function(t) {
            this.triggerEvent("getuserinfo", _extends({}, t.detail, t.currentTarget.dataset));
        },
        bindcontact: function(t) {
            this.triggerEvent("contact", _extends({}, t.detail, t.currentTarget.dataset));
        },
        bindgetphonenumber: function(t) {
            this.triggerEvent("getphonenumber", _extends({}, t.detail, t.currentTarget.dataset));
        },
        bindopensetting: function(t) {
            this.triggerEvent("opensetting", _extends({}, t.detail, t.currentTarget.dataset));
        },
        onError: function(t) {
            this.triggerEvent("error", _extends({}, t.detail, t.currentTarget.dataset));
        }
    },
    data: {
        buttonVisible: !1
    },
    attached: function() {
        var t = this.data, e = t.defaultVisible, A = t.visible, n = t.controlled ? A : e;
        this.setData({
            buttonVisible: n
        });
    }
});