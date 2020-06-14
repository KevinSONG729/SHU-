var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
    }
    return e;
}, _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _mergeOptionsToData = require("../helpers/mergeOptionsToData"), _mergeOptionsToData2 = _interopRequireDefault(_mergeOptionsToData), _index = require("../index");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var defaults = {
    theme: "ios",
    className: "",
    titleText: "",
    buttons: [],
    buttonClicked: function() {},
    cancelText: "取消",
    cancel: function() {}
};

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    data: (0, _mergeOptionsToData2.default)(defaults),
    methods: {
        showSheet: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, e));
            return this.removed = !1, this.$$setData(_extends({
                in: !0
            }, t)), this.$wuxBackdrop.retain(), this.cancel.bind(this);
        },
        removeSheet: function(e) {
            if (this.removed) return !1;
            this.removed = !0, this.$$setData({
                in: !1
            }), this.$wuxBackdrop.release(), "function" == typeof e && e(this.data.buttons);
        },
        buttonClicked: function(e) {
            var t = e.currentTarget.dataset.index;
            !0 === this.fns.buttonClicked(t, this.data.buttons[t]) && this.removeSheet();
        },
        destructiveButtonClicked: function() {
            !0 === this.fns.destructiveButtonClicked() && this.removeSheet();
        },
        cancel: function() {
            this.removeSheet(this.fns.cancel);
        }
    },
    created: function() {
        this.$wuxBackdrop = (0, _index.$wuxBackdrop)("#wux-backdrop", this);
    }
});