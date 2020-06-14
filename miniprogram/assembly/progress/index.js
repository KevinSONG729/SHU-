var _colors = require("../helpers/colors"), defaultColors = {
    normal: _colors.colors.positive,
    progress: _colors.colors.positive,
    error: _colors.colors.assertive,
    success: _colors.colors.balanced
};

Component({
    externalClasses: [ "wux-class" ],
    properties: {
        percent: {
            type: Number,
            value: 0,
            observer: "updateStyle"
        },
        strokeWidth: {
            type: Number,
            value: 10,
            observer: "updateStyle"
        },
        activeColor: {
            type: String,
            value: "",
            observer: "updateStyle"
        },
        backgroundColor: {
            type: String,
            value: "#f3f3f3"
        },
        status: {
            type: String,
            value: "normal",
            observer: "updateStyle"
        },
        shape: {
            type: String,
            value: "round"
        },
        barStyle: {
            type: String,
            value: ""
        },
        showInfo: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        width: 0,
        style: ""
    },
    methods: {
        updateStyle: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.assign({}, this.data, e), o = t.percent, r = t.strokeWidth, s = t.activeColor, l = t.status, a = o < 0 ? 0 : 100 < o ? 100 : o, u = 0 < r ? r : 10, i = "background-color: " + (s || (defaultColors[l] || defaultColors.normal)) + "; width: " + a + "%; height: " + u + "px;";
            this.setData({
                width: a,
                style: i
            });
        }
    },
    attached: function() {
        this.updateStyle();
    }
});