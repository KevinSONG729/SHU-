var defaultStyle = "transition: transform .4s; transform: translate3d(0px, 0px, 0px) scale(1);";

Component({
    externalClasses: [ "wux-class" ],
    data: {
        className: "wux-refresher--hidden",
        style: defaultStyle
    },
    properties: {
        pullingIcon: {
            type: String,
            value: "wux-refresher__icon--arrow-down"
        },
        pullingText: {
            type: String,
            value: "下拉刷新"
        },
        refreshingIcon: {
            type: String,
            value: "wux-refresher__icon--refresher"
        },
        refreshingText: {
            type: String,
            value: "正在刷新"
        },
        disablePullingRotation: {
            type: Boolean,
            value: !1
        },
        distance: {
            type: Number,
            value: 30
        }
    },
    methods: {
        activate: function() {
            this.setData({
                style: defaultStyle,
                className: "wux-refresher--visible"
            });
        },
        deactivate: function() {
            this.activated && (this.activated = !1), this.setData({
                style: defaultStyle,
                className: "wux-refresher--hidden"
            });
        },
        refreshing: function() {
            this.setData({
                style: "transition: transform .4s; transform: translate3d(0, 50px, 0) scale(1);",
                className: "wux-refresher--active wux-refresher--refreshing"
            });
        },
        tail: function() {
            this.setData({
                className: "wux-refresher--active wux-refresher--refreshing wux-refresher--refreshing-tail"
            });
        },
        move: function(t) {
            var e = "transition-duration: 0s; transform: translate3d(0, " + t + "px, 0) scale(1);", i = t < this.data.distance ? "wux-refresher--visible" : "wux-refresher--active";
            this.setData({
                style: e,
                className: i
            });
        },
        isRefreshing: function() {
            return -1 !== this.data.className.indexOf("wux-refresher--refreshing");
        },
        getTouchPosition: function(t) {
            return {
                x: t.changedTouches[0].pageX,
                y: t.changedTouches[0].pageY
            };
        },
        requestAnimationFrame: function(t) {
            var e = this, i = new Date().getTime(), s = Math.max(0, 16 - (i - this.lastTime)), a = setTimeout(function() {
                t.bind(e)(i + s);
            }, s);
            return this.lastTime = i + s, a;
        },
        cancelAnimationFrame: function(t) {
            clearTimeout(t);
        },
        finishPullToRefresh: function() {
            var t = this;
            setTimeout(function() {
                t.requestAnimationFrame(t.tail), setTimeout(function() {
                    return t.deactivate();
                }, 200);
            }, 200);
        },
        bindtouchstart: function(t) {
            if (this.isRefreshing()) return !1;
            var e = this.getTouchPosition(t);
            this.start = e, this.diffX = this.diffY = 0, this.activate();
        },
        bindtouchmove: function(t) {
            if (!this.start || this.isRefreshing()) return !1;
            var e = this.getTouchPosition(t);
            if (this.diffX = e.x - this.start.x, this.diffY = e.y - this.start.y, this.diffY < 0) return !1;
            this.diffY = Math.pow(this.diffY, .8), !this.activated && this.diffY > this.data.distance ? (this.activated = !0, 
            this.triggerEvent("pulling")) : this.activated && this.diffY < this.data.distance && (this.activated = !1), 
            this.move(this.diffY);
        },
        bindtouchend: function(t) {
            if (this.start = !1, this.diffY <= 0 || this.isRefreshing()) return !1;
            this.deactivate(), Math.abs(this.diffY) >= this.data.distance && (this.refreshing(), 
            this.triggerEvent("refresh"));
        }
    },
    created: function() {
        this.lastTime = 0, this.activated = !1;
    }
});