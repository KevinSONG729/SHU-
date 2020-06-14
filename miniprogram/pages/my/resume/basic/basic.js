var data_list = require("../../../../public/js/data.js"), common = require("../../../../public/js/common.js"), app = getApp();

Page({
    data: {
        name: "",
        sex_arr: [ "女", "男" ],
        sex: 0,
        age: 18,
        area_arr: [ [ "北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "香港", "澳门", "台湾" ], [ "北京" ] ],
        area: {
            arr: [ 0, 0 ],
            city: "北京"
        },
        education_arr: [ "计算机工程与科学学院", "理学院", "经济学院", "社区学院", "其他" ],
        education: 0,
        phone: "",
        email: "",
        wechat_id: ""
    },
    onLoad: function(a) {
        this.sel_basic();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    changeName: function(a) {
        !1 !== a.detail.value && this.setData({
            name: a.detail.value
        });
    },
    changeAge: function(a) {
        !1 !== a.detail.value && this.setData({
            age: a.detail.value
        });
    },
    changePhone: function(a) {
        !1 !== a.detail.value && this.setData({
            phone: a.detail.value
        });
    },
    changeEmail: function(a) {
        !1 !== a.detail.value && this.setData({
            email: a.detail.value
        });
    },
    changeWechat_id: function(a) {
        !1 !== a.detail.value && this.setData({
            wechat_id: a.detail.value
        });
    },
    changeSex: function(a) {
        !1 !== a.detail.value && this.setData({
            sex: a.detail.value
        });
    },
    columnchangeArea: function(a) {
        if (0 <= a.detail.value && 0 == a.detail.column) {
            var t = this.data.area_arr, e = t[0][a.detail.value], i = data_list.area[e];
            t.splice(1, 1, i), this.setData({
                area_arr: t
            });
        }
    },
    changeArea: function(a) {
        if (!1 !== a.detail.value) {
            var t = this.data.area_arr, e = {};
            e.arr = a.detail.value;
            var i = t[0][a.detail.value[0]], n = a.detail.value[1];
            e.city = data_list.area[i][n], this.setData({
                area: e
            });
        }
    },
    changeIs_marry: function(a) {
        !1 !== a.detail.value && this.setData({
            is_marry: a.detail.value
        });
    },
    changeEducation: function(a) {
        !1 !== a.detail.value && this.setData({
            education: a.detail.value
        });
    },
    formSubmit: function() {
        var a = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token,
            m: "dawn_banana"
        };
        return "" == this.data.name ? (common.modal_alert("请输入姓名"), !1) : (a.name = this.data.name, 
        0 != this.data.sex && 1 != this.data.sex ? (common.modal_alert("请选择正确的性别"), !1) : (a.sex = this.data.sex, 
        "" == this.data.age ? (common.modal_alert("请填写年龄"), !1) : (a.age = this.data.age, 
        "" == this.data.area.city ? (common.modal_alert("请选择户籍所在"), !1) : (a.area = this.data.city, 
        0 != this.data.is_marry && 1 != this.data.is_marry ? (common.modal_alert("请选择婚否"), 
        !1) : (a.is_marry = this.data.is_marry, "" === this.data.education ? (common.modal_alert("请选择学历"), 
        !1) : (a.education = this.data.education, /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.data.phone) ? (a.phone = this.data.phone, 
        /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.data.email) ? (a.email = this.data.email, 
        a.wechat_id = this.data.wechat_id, void app.util.request({
            url: "entry/wxapp/resume.basic",
            method: "POST",
            data: a,
            cachetime: "0",
            success: function(a) {
                0 == a.data.code ? wx.showToast({
                    icon: "success",
                    duration: 1e3
                }) : common.modal_alert(a.data.msg);
            },
            fail: function(a) {
                wx.showToast({
                    title: "网络延迟",
                    icon: "success",
                    duration: 1e3
                });
            }
        })) : (common.modal_alert("请填写正确的邮箱"), !1)) : (common.modal_alert("请填写正确的手机号"), 
        !1)))))));
    },
    sel_basic: function() {
        var t = this, a = {
            userId: wx.getStorageSync("userinfo").userId,
            expire_time: wx.getStorageSync("userinfo").expire_time,
            token: wx.getStorageSync("userinfo").token,
            m: "dawn_banana",
            type: "basic"
        };
        app.util.request({
            url: "entry/wxapp/resume.sel_data",
            method: "GET",
            data: a,
            cachetime: "0",
            success: function(a) {
                0 == a.data.code && t.setData({
                    name: a.data.data.name,
                    sex: a.data.data.sex,
                    age: a.data.data.age,
                    area: {
                        city: a.data.data.area
                    },
                    is_marry: a.data.data.is_marry,
                    education: a.data.data.education,
                    phone: a.data.data.phone,
                    email: a.data.data.email,
                    wechat_id: a.data.data.wechat_id
                });
            },
            fail: function(a) {
                common.modal_alert("网络异常");
            }
        });
    }
});