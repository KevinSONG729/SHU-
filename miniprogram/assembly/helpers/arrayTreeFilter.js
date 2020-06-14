function arrayTreeFilter(e, r, t) {
    (t = t || {}).childrenKeyName = t.childrenKeyName || "children";
    var i = e || [], a = [], l = 0;
    do {
        var n = i.filter(function(e) {
            return r(e, l);
        })[0];
        if (!n) break;
        a.push(n), i = n[t.childrenKeyName] || [], l += 1;
    } while (0 < i.length);
    return a;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = arrayTreeFilter;