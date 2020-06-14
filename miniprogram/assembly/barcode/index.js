var _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _barcode = require("./barcode"), _barcode2 = _interopRequireDefault(_barcode);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var defalutOptions = {
    number: !0,
    prefix: !0,
    color: "black",
    debug: !1,
    onValid: function() {},
    onInvalid: function() {},
    onSuccess: function() {},
    onError: function() {}
};

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    properties: {
        width: {
            type: Number,
            value: 200
        },
        height: {
            type: Number,
            value: 100
        },
        number: {
            type: String,
            value: "",
            observer: function(e) {
                this.draw({
                    number: e
                });
            }
        },
        options: {
            type: Object,
            value: defalutOptions
        },
        canvasId: {
            type: String,
            value: "wux-barcode"
        }
    },
    methods: {
        draw: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.assign({}, this.data, e), a = t.canvasId, r = t.number, i = t.width, n = t.height, o = t.options;
            new _barcode2.default(a, r, Object.assign({
                width: i,
                height: n
            }, o), this);
        }
    }
});