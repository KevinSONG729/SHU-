var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, ENTER = "enter", ENTERING = "entering", ENTERED = "entered", EXIT = "exit", EXITING = "exiting", EXITED = "exited", UNMOUNTED = "unmounted", TRANSITION = "transition", ANIMATION = "animation", TIMEOUT = 1e3 / 60, defaultClassNames = {
    enter: "",
    enterActive: "",
    enterDone: "",
    exit: "",
    exitActive: "",
    exitDone: ""
};

Component({
    externalClasses: [ "wux-class" ],
    data: {
        animateCss: "",
        animateStatus: EXITED,
        isMounting: !1
    },
    properties: {
        in: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                this.data.isMounting && this.updated(t);
            }
        },
        classNames: {
            type: null,
            value: defaultClassNames
        },
        duration: {
            type: null,
            value: null
        },
        type: {
            type: String,
            value: TRANSITION
        },
        appear: {
            type: Boolean,
            value: !1
        },
        enter: {
            type: Boolean,
            value: !0
        },
        exit: {
            type: Boolean,
            value: !0
        },
        mountOnEnter: {
            type: Boolean,
            value: !0
        },
        unmountOnExit: {
            type: Boolean,
            value: !0
        },
        wrapStyle: {
            type: String,
            value: ""
        }
    },
    methods: {
        addEventListener: function() {
            var t = this.data.animateStatus, e = this.getTimeouts(), a = e.enter, n = e.exit;
            t === ENTERING && !a && this.data.enter && this.performEntered(), t === EXITING && !n && this.data.exit && this.performExited();
        },
        onTransitionEnd: function() {
            this.data.type === TRANSITION && this.addEventListener();
        },
        onAnimationEnd: function() {
            this.data.type === ANIMATION && this.addEventListener();
        },
        updateStatus: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
            null !== t && (this.cancelNextCallback(), this.isAppearing = e, t === ENTERING ? this.performEnter() : this.performExit());
        },
        performEnter: function() {
            var t = this, e = this.getClassNames(ENTER), a = e.className, n = e.activeClassName, i = this.getTimeouts().enter, s = {
                animateStatus: ENTER,
                animateCss: a
            }, r = {
                animateStatus: ENTERING,
                animateCss: a + " " + n
            };
            if (!this.isAppearing && !this.data.enter) return this.performEntered();
            this.safeSetData(s, function() {
                t.triggerEvent("change", {
                    animateStatus: ENTER
                }), t.triggerEvent(ENTER, {
                    isAppearing: t.isAppearing
                }), t.delayHandler(TIMEOUT, function() {
                    t.safeSetData(r, function() {
                        t.triggerEvent("change", {
                            animateStatus: ENTERING
                        }), t.triggerEvent(ENTERING, {
                            isAppearing: t.isAppearing
                        }), i && t.delayHandler(i, t.performEntered);
                    });
                });
            });
        },
        performEntered: function() {
            var t = this, e = this.getClassNames(ENTER).doneClassName, a = {
                animateStatus: ENTERED,
                animateCss: e
            };
            this.safeSetData(a, function() {
                t.triggerEvent("change", {
                    animateStatus: ENTERED
                }), t.triggerEvent(ENTERED, {
                    isAppearing: t.isAppearing
                });
            });
        },
        performExit: function() {
            var t = this, e = this.getClassNames(EXIT), a = e.className, n = e.activeClassName, i = this.getTimeouts().exit, s = {
                animateStatus: EXIT,
                animateCss: a
            }, r = {
                animateStatus: EXITING,
                animateCss: a + " " + n
            };
            if (!this.data.exit) return this.performExited();
            this.safeSetData(s, function() {
                t.triggerEvent("change", {
                    animateStatus: EXIT
                }), t.triggerEvent(EXIT), t.delayHandler(TIMEOUT, function() {
                    t.safeSetData(r, function() {
                        t.triggerEvent("change", {
                            animateStatus: EXITING
                        }), t.triggerEvent(EXITING), i && t.delayHandler(i, t.performExited);
                    });
                });
            });
        },
        performExited: function() {
            var t = this, e = this.getClassNames(EXIT).doneClassName, a = {
                animateStatus: EXITED,
                animateCss: e
            };
            this.safeSetData(a, function() {
                t.triggerEvent("change", {
                    animateStatus: EXITED
                }), t.triggerEvent(EXITED), t.data.unmountOnExit && t.setData({
                    animateStatus: UNMOUNTED
                }, function() {
                    t.triggerEvent("change", {
                        animateStatus: UNMOUNTED
                    });
                });
            });
        },
        getClassNames: function(t) {
            var e = this.data.classNames;
            return {
                className: "string" != typeof e ? e[t] : e + "-" + t,
                activeClassName: "string" != typeof e ? e[t + "Active"] : e + "-" + t + "-active",
                doneClassName: "string" != typeof e ? e[t + "Done"] : e + "-" + t + "-done"
            };
        },
        getTimeouts: function() {
            var t = this.data.duration;
            return null !== t && "object" === (void 0 === t ? "undefined" : _typeof(t)) ? {
                enter: t.enter,
                exit: t.exit
            } : "number" == typeof t ? {
                enter: t,
                exit: t
            } : {};
        },
        updated: function(t) {
            var e = this, a = (this.pendingData || this.data).animateStatus, n = null;
            t ? (a === UNMOUNTED && (a = EXITED, this.setData({
                animateStatus: EXITED
            }, function() {
                e.triggerEvent("change", {
                    animateStatus: EXITED
                });
            })), a !== ENTER && a !== ENTERING && a !== ENTERED && (n = ENTERING)) : a !== ENTER && a !== ENTERING && a !== ENTERED || (n = EXITING), 
            this.updateStatus(n);
        },
        safeSetData: function(t, e) {
            var a = this;
            this.pendingData = Object.assign({}, this.data, t), e = this.setNextCallback(e), 
            this.setData(t, function() {
                a.pendingData = null, e();
            });
        },
        setNextCallback: function(e) {
            var a = this, n = !0;
            return this.nextCallback = function(t) {
                n && (n = !1, a.nextCallback = null, e.call(a, t));
            }, this.nextCallback.cancel = function() {
                n = !1;
            }, this.nextCallback;
        },
        cancelNextCallback: function() {
            null !== this.nextCallback && (this.nextCallback.cancel(), this.nextCallback = null);
        },
        delayHandler: function(t, e) {
            t && (this.setNextCallback(e), setTimeout(this.nextCallback, t));
        },
        onTap: function() {
            this.triggerEvent("click");
        }
    },
    created: function() {
        this.nextCallback = null;
    },
    attached: function() {
        var t = this, e = null, a = null;
        this.data.in ? this.data.appear ? (e = EXITED, a = ENTERING) : e = ENTERED : e = this.data.unmountOnExit || this.data.mountOnEnter ? UNMOUNTED : EXITED, 
        this.safeSetData({
            animateStatus: e,
            isMounting: !0
        }, function() {
            t.triggerEvent("change", {
                animateStatus: e
            }), t.updateStatus(a, !0);
        });
    },
    detached: function() {
        this.cancelNextCallback();
    }
});