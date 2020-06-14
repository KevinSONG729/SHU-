var _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    properties: {
        transparent: {
            type: Boolean,
            value: !1
        },
        zIndex: {
            type: Number,
            value: 1e3
        }
    },
    methods: {
        retain: function() {
            "number" == typeof this.backdropHolds && this.backdropHolds || (this.backdropHolds = 0), 
            this.backdropHolds = this.backdropHolds + 1, 1 === this.backdropHolds && this.$$setData({
                in: !0
            });
        },
        release: function() {
            1 === this.backdropHolds && this.$$setData({
                in: !1
            }), this.backdropHolds = Math.max(0, this.backdropHolds - 1);
        },
        onClick: function() {
            this.triggerEvent("click");
        }
    }
});