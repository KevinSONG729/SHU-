var _slicedToArray = function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, e) {
        var r = [], a = !0, n = !1, i = void 0;
        try {
            for (var l, s = t[Symbol.iterator](); !(a = (l = s.next()).done) && (r.push(l.value), 
            !e || r.length !== e); a = !0) ;
        } catch (t) {
            n = !0, i = t;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (n) throw i;
            }
        }
        return r;
    }(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
};

Component({
    data:{
        userInfo:null,
        onGetUserInfo:null
    },
    externalClasses: [ "wux-class" ],
    properties: {
        shape: {
            type: String,
            value: "circle"
        },
        size: {
            type: String,
            value: "default"
        },
        src: {
            type: String,
            value: ""
        },
        bodyStyle: {
            type: String,
            value: ""
        },
        scale: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        childrenStyle: ""
    },
    methods: {
        setScale: function() {
            var l = this, t = wx.createSelectorQuery().in(this);
            t.select(".wux-avatar").boundingClientRect(), t.select(".wux-avatar__string").boundingClientRect(), 
            t.exec(function(t) {
                if (t.filter(function(t) {
                    return !t;
                }).length) return !1;
                var e = _slicedToArray(t, 2), r = e[0], a = e[1], n = r.width - 8 < a.width ? (r.width - 8) / a.width : 1, i = 1 !== n ? "position: absolute; display: inline-block; transform: scale(" + n + "); left: calc(50% - " + Math.round(a.width / 2) + "px)" : "";
                l.setData({
                    childrenStyle: i
                });
            });
        }
    },
    ready: function() {
        !this.data.src && this.data.scale && this.setScale();
    },
    onGetUserInfo: function(e) {
        if (!this.logged && e.detail.userInfo) {
            console.log(e),
          this.setData({
            logged: true,
            userInfo: e.detail.userInfo
          })
        }
      },
});