var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _mergeOptionsToData = require("../helpers/mergeOptionsToData"), _mergeOptionsToData2 = _interopRequireDefault(_mergeOptionsToData), _index = require("../index");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var defaults = {
    text: "数据加载中",
    mask: !0
};

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    data: (0, _mergeOptionsToData2.default)(defaults),
    methods: {
        hide: function() {
            this.$$setData({
                in: !1
            }), this.$wuxBackdrop && this.$wuxBackdrop.release();
        },
        show: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, e));
            this.$$setData(_extends({
                in: !0
            }, t)), this.$wuxBackdrop && this.$wuxBackdrop.retain();
        }
    },
    created: function() {
        this.data.mask && (this.$wuxBackdrop = (0, _index.$wuxBackdrop)("#wux-backdrop", this));
    }
});