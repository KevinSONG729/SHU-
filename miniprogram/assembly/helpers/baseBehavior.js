Object.defineProperty(exports, "__esModule", {
    value: !0
});

var bind = function(r, i) {
    return function() {
        for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
        return e.length ? r.apply(i, e) : r.call(i);
    };
}, assign = function() {
    for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
    return Object.assign.apply(Object, [ {} ].concat(e));
};

exports.default = Behavior({
    properties: {
        visible: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        $$mergeOptionsAndBindMethods: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.fns, n = Object.assign({}, t);
            for (var r in n) n.hasOwnProperty(r) && "function" == typeof n[r] && (e[r] = bind(n[r], this), 
            delete n[r]);
            return n;
        },
        $$setData: function() {
            for (var e = this, t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
            var i = assign.apply(void 0, [ {} ].concat(n));
            return new Promise(function(t) {
                e.setData(i, t);
            });
        },
        $$requestAnimationFrame: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function() {}, e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1e3 / 60;
            return new Promise(function(t) {
                return setTimeout(t, e);
            }).then(t);
        }
    },
    created: function() {
        this.fns = {};
    },
    detached: function() {
        this.fns = {};
    }
});