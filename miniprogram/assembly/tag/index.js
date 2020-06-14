var isPresetColor = function(e) {
    return !!e && /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(e);
};

Component({
    externalClasses: [ "wux-class", "wux-hover-class" ],
    data: {
        className: "",
        style: ""
    },
    properties: {
        color: {
            type: String,
            value: "",
            observer: function(e) {
                var r = isPresetColor(e), s = r ? "wux-tag--" + e : "", t = r ? "" : "background-color: " + e + "; color: #fff";
                this.setData({
                    className: s,
                    style: t
                });
            }
        }
    },
    methods: {
        onTap: function() {
            this.triggerEvent("click");
        }
    }
});