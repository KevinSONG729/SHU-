var _index = require("../index"), prefixCls = "wux-animate";

Component({
    externalClasses: [ "wux-class" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        title: {
            type: String,
            value: ""
        },
        content: {
            type: String,
            value: ""
        },
        extra: {
            type: String,
            value: ""
        },
        position: {
            type: String,
            value: "center",
            observer: "getTransitionName"
        },
        wrapStyle: {
            type: String,
            value: ""
        },
        closable: {
            type: Boolean,
            value: !1
        },
        mask: {
            type: Boolean,
            value: !0
        },
        maskClosable: {
            type: Boolean,
            value: !0
        },
        visible: {
            type: Boolean,
            value: !1,
            observer: "setPopupVisible"
        },
        zIndex: {
            type: Number,
            value: 1e3
        }
    },
    data: {
        transitionName: "",
        popupVisible: !1
    },
    methods: {
        close: function() {
            this.triggerEvent("close");
        },
        onMaskClick: function() {
            this.data.maskClosable && this.close();
        },
        onExited: function() {
            this.triggerEvent("closed");
        },
        getTransitionName: function() {
            var e = "";
            switch (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.position) {
              case "top":
                e = prefixCls + "--slideInDown";
                break;

              case "right":
                e = prefixCls + "--slideInRight";
                break;

              case "bottom":
                e = prefixCls + "--slideInUp";
                break;

              case "left":
                e = prefixCls + "--slideInLeft";
                break;

              default:
                e = prefixCls + "--fadeIn";
            }
            this.setData({
                transitionName: e
            });
        },
        setPopupVisible: function(e) {
            this.data.popupVisible !== e && (this.setData({
                popupVisible: e
            }), this.setBackdropVisible(e));
        },
        setBackdropVisible: function(e) {
            this.data.mask && this.$wuxBackdrop && this.$wuxBackdrop[e ? "retain" : "release"]();
        }
    },
    created: function() {
        this.data.mask && (this.$wuxBackdrop = (0, _index.$wuxBackdrop)("#wux-backdrop", this));
    },
    attached: function() {
        this.setPopupVisible(this.data.visible), this.getTransitionName();
    }
});