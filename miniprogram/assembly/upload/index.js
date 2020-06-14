var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
};

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

Component({
    externalClasses: [ "wux-class" ],
    properties: {
        max: {
            type: Number,
            value: -1,
            observer: "updated"
        },
        count: {
            type: Number,
            value: 9,
            observer: "updated"
        },
        sizeType: {
            type: Array,
            value: [ "original", "compressed" ]
        },
        sourceType: {
            type: Array,
            value: [ "album", "camera" ]
        },
        url: {
            type: String,
            value: ""
        },
        name: {
            type: String,
            value: "file"
        },
        header: {
            type: Object,
            value: {}
        },
        formData: {
            type: Object,
            value: {}
        },
        uploaded: {
            type: Boolean,
            value: !0
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        progress: {
            type: Boolean,
            value: !1
        },
        listType: {
            type: String,
            value: "text"
        },
        defaultFileList: {
            type: Array,
            value: []
        },
        fileList: {
            type: Array,
            value: [],
            observer: function(e) {
                this.data.controlled && this.setData({
                    uploadFileList: e
                });
            }
        },
        controlled: {
            type: Boolean,
            value: !1
        },
        showUploadList: {
            type: Boolean,
            value: !0
        },
        showRemoveIcon: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        uploadMax: -1,
        uploadCount: 9,
        uploadFileList: []
    },
    methods: {
        updated: function() {
            var e = this.data, t = e.count, a = e.max, i = this.calcValue(t, a), r = i.uploadMax, o = i.uploadCount;
            this.data.uploadMax === r && this.data.uploadCount === o || this.setData({
                uploadMax: r,
                uploadCount: o
            });
        },
        calcValue: function(e, t) {
            var a = parseInt(e), i = -1 < parseInt(t) ? parseInt(t) : -1, r = a;
            return -1 !== i && i <= 9 && i < a && (r = i), {
                uploadMax: i,
                uploadCount: r
            };
        },
        onSelect: function() {
            var t = this, e = this.data, a = e.uploadCount, i = e.uploadMax, r = e.sizeType, o = e.sourceType, s = e.uploaded, n = e.disabled, l = e.uploadFileList, u = this.calcValue(a, i - l.length).uploadCount;
            n || wx.chooseImage({
                count: u,
                sizeType: r,
                sourceType: o,
                success: function(e) {
                    t.tempFilePaths = e.tempFilePaths.map(function(e) {
                        return {
                            url: e,
                            uid: t.getUid()
                        };
                    }), t.triggerEvent("before", _extends({}, e, {
                        fileList: l
                    })), s && t.uploadFile();
                }
            });
        },
        onChange: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            this.data.controlled || this.setData({
                uploadFileList: e.fileList
            }), this.triggerEvent("change", e);
        },
        onStart: function(e) {
            var t = _extends({}, e, {
                status: "uploading"
            });
            this.onChange({
                file: t,
                fileList: [].concat(_toConsumableArray(this.data.uploadFileList), [ t ])
            });
        },
        onSuccess: function(e, t) {
            var a = [].concat(_toConsumableArray(this.data.uploadFileList)), i = a.map(function(e) {
                return e.uid;
            }).indexOf(e.uid);
            if (-1 !== i) {
                var r = _extends({}, e, {
                    status: "done",
                    res: t
                }), o = {
                    file: r,
                    fileList: a
                };
                a.splice(i, 1, r), this.triggerEvent("success", o), this.onChange(o);
            }
        },
        onFail: function(e, t) {
            var a = [].concat(_toConsumableArray(this.data.uploadFileList)), i = a.map(function(e) {
                return e.uid;
            }).indexOf(e.uid);
            if (-1 !== i) {
                var r = _extends({}, e, {
                    status: "error",
                    res: t
                }), o = {
                    file: r,
                    fileList: a
                };
                a.splice(i, 1, r), this.triggerEvent("fail", o), this.onChange(o);
            }
        },
        onProgress: function(e, t) {
            var a = [].concat(_toConsumableArray(this.data.uploadFileList)), i = a.map(function(e) {
                return e.uid;
            }).indexOf(e.uid);
            if (-1 !== i) {
                var r = _extends({}, e, {
                    progress: t.progress,
                    res: t
                }), o = {
                    file: r,
                    fileList: a
                };
                a.splice(i, 1, r), this.triggerEvent("progress", o), this.onChange(o);
            }
        },
        uploadFile: function() {
            var t = this;
            if (this.tempFilePaths.length) {
                var e = this.data, a = e.url, i = e.name, r = e.header, o = e.formData, s = e.disabled, n = e.progress, l = this.tempFilePaths.shift(), u = l.uid, d = l.url;
                a && d && !s && (this.onStart(l), this.uploadTask[u] = wx.uploadFile({
                    url: a,
                    filePath: d,
                    name: i,
                    header: r,
                    formData: o,
                    success: function(e) {
                        return t.onSuccess(l, e);
                    },
                    fail: function(e) {
                        return t.onFail(l, e);
                    },
                    complete: function(e) {
                        delete t.uploadTask[u], t.triggerEvent("complete", e), t.uploadFile();
                    }
                }), n && this.uploadTask[u].onProgressUpdate(function(e) {
                    return t.onProgress(l, e);
                }));
            }
        },
        onPreview: function(e) {
            this.triggerEvent("preview", _extends({}, e.currentTarget.dataset, {
                fileList: this.data.uploadFileList
            }));
        },
        onRemove: function(e) {
            var t = e.currentTarget.dataset.file, a = [].concat(_toConsumableArray(this.data.uploadFileList)), i = a.map(function(e) {
                return e.uid;
            }).indexOf(t.uid);
            if (-1 !== i) {
                var r = {
                    file: _extends({}, t, {
                        status: "remove"
                    }),
                    fileList: a
                };
                a.splice(i, 1), this.triggerEvent("remove", _extends({}, e.currentTarget.dataset, r)), 
                this.onChange(r);
            }
        },
        abort: function(e) {
            var t = this.uploadTask;
            e ? t[e] && (t[e].abort(), delete t[e]) : Object.keys(t).forEach(function(e) {
                t[e] && (t[e].abort(), delete t[e]);
            });
        }
    },
    created: function() {
        var e = this;
        this.index = 0, this.createdAt = Date.now(), this.getUid = function() {
            return "wux-upload--" + e.createdAt + "-" + ++e.index;
        }, this.uploadTask = {}, this.tempFilePaths = [];
    },
    attached: function() {
        var e = this.data, t = e.defaultFileList, a = e.fileList, i = e.controlled ? a : t;
        this.setData({
            uploadFileList: i
        });
    },
    detached: function() {
        this.abort();
    }
});