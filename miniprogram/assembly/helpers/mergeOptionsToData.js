Object.defineProperty(exports, "__esModule", {
    value: !0
});

var mergeOptionsToData = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.assign({}, e);
    for (var r in t) t.hasOwnProperty(r) && "function" == typeof t[r] && delete t[r];
    return t;
};

exports.default = mergeOptionsToData;