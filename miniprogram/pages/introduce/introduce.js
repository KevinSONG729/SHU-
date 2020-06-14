// pages/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  changeToFirst() {
    wx.switchTab({
      url: '../tabBar/home/home',
    })
  }
})