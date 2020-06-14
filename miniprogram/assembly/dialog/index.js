var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
}, _baseBehavior = require("../helpers/baseBehavior"), _baseBehavior2 = _interopRequireDefault(_baseBehavior), _mergeOptionsToData = require("../helpers/mergeOptionsToData"), _mergeOptionsToData2 = _interopRequireDefault(_mergeOptionsToData);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var defaults = {
    title: "",
    content: "",
    buttons: [],
    verticalButtons: !1,
    resetOnClose: !1,
    closable: !1,
    mask: !0,
    maskClosable: !0,
    zIndex: 1e3
}, defaultOptions = {
    onCancel: function() {},
    cancelText: "取消",
    cancelType: "default",
    onConfirm: function() {},
    confirmText: "确定",
    confirmType: "primary"
};

Component({
    behaviors: [ _baseBehavior2.default ],
    externalClasses: [ "wux-class" ],
    data: (0, _mergeOptionsToData2.default)(defaults),
    methods: {
        onClosed: function() {
            if (this.data.resetOnClose) {
                var e = _extends({}, (0, _mergeOptionsToData2.default)(defaults), {
                    prompt: null
                });
                this.$$setData(e);
            }
        },
        onClose: function() {
            this.hide();
        },
        hide: function(e) {
            this.$$setData({
                in: !1
            }), "function" == typeof e && e.call(this);
        },
        show: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, e));
            return this.$$setData(_extends({
                in: !0
            }, t)), this.hide.bind(this);
        },
        buttonTapped: function(e) {
            var t = e.currentTarget.dataset.index, n = this.data.buttons[t];
            this.hide(function() {
                return "function" == typeof n.onTap && n.onTap(e);
            });
        },
        bindinput: function(e) {
            this.$$setData({
                "prompt.response": e.detail.value
            });
        },
        open: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return this.show(e);
        },
        alert: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return this.open(Object.assign({
                buttons: [ {
                    text: t.confirmText || defaultOptions.confirmText,
                    type: t.confirmType || defaultOptions.confirmType,
                    onTap: function(e) {
                        "function" == typeof t.onConfirm && t.onConfirm(e);
                    }
                } ]
            }, t));
        },
        confirm: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return this.open(Object.assign({
                buttons: [ {
                    text: t.cancelText || defaultOptions.cancelText,
                    type: t.cancelType || defaultOptions.cancelType,
                    onTap: function(e) {
                        "function" == typeof t.onCancel && t.onCancel(e);
                    }
                }, {
                    text: t.confirmText || defaultOptions.confirmText,
                    type: t.confirmType || defaultOptions.confirmType,
                    onTap: function(e) {
                        "function" == typeof t.onConfirm && t.onConfirm(e);
                    }
                } ]
            }, t));
        },
        prompt: function() {
            var t = this, n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = {
                fieldtype: n.fieldtype ? n.fieldtype : "text",
                password: !!n.password,
                response: n.defaultText ? n.defaultText : "",
                placeholder: n.placeholder ? n.placeholder : "",
                maxlength: n.maxlength ? parseInt(n.maxlength) : ""
            };
            return this.open(Object.assign({
                prompt: e,
                buttons: [ {
                    text: n.cancelText || defaultOptions.cancelText,
                    type: n.cancelType || defaultOptions.cancelType,
                    onTap: function(e) {
                        "function" == typeof n.onCancel && n.onCancel(e);
                    }
                }, {
                    text: n.confirmText || defaultOptions.confirmText,
                    type: n.confirmType || defaultOptions.confirmType,
                    onTap: function(e) {
                        "function" == typeof n.onConfirm && n.onConfirm(e, t.data.prompt.response);
                    }
                } ]
            }, n));
        }
    }
});