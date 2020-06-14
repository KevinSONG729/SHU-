Object.defineProperty(exports, "__esModule", {
    value: !0
});

var getTouchPoints = exports.getTouchPoints = function(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, s = t.touches[e] || t.changedTouches[e];
    return {
        x: s.pageX,
        y: s.pageY
    };
}, getPointsNumber = exports.getPointsNumber = function(t) {
    return t.touches && t.touches.length || t.changedTouches && t.changedTouches.length;
}, isEqualPoints = exports.isEqualPoints = function(t, e) {
    return t.x === e.x && t.y === e.y;
}, isNearbyPoints = exports.isNearbyPoints = function(t, e) {
    var s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 25;
    return Math.abs(t.x - e.x) < s & Math.abs(t.y - e.y) < s;
}, getPointsDistance = exports.getPointsDistance = function(t, e) {
    var s = Math.abs(t.x - e.x), n = Math.abs(t.y - e.y);
    return Math.sqrt(s * s + n * n);
};