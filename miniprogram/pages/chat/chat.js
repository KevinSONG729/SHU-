// pages/chat/chat.js

const db=wx.cloud.database()
const chatroomCollection=db.collection('chatroom')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      openId:'',//当前用户Id
      chats:[],  //存储聊天记录
      textInputValue:'',  //存储输入内容
      userInfo: null   //存储当前用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo:res.userInfo
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady(){
   chatroomCollection.watch({
     onChange:this.onChange.bind(this),
     onError(err){
       console.error(err)
     }
  })
  const {result}=await wx.cloud.callFunction({
    name:'login'
  })

  this.setData({
    openId:result.openid
  })
},

  onChange(snapshot){
    console.log(snapshot) //监听开始时的初始化数据
    if(snapshot.type==='init'){
      this.setData({
        chats:[
          ...this.data.chats,
          ...[...snapshot.docs].sort((x,y)=>x.sendTimeTS-y.sendTimeTS)  //实现升序
        ]
      })
    }else{
      const chats=[...this.data.chats]
      for(const docChange of snapshot.docChange){
        //queueType:列表更新类型，表示更新事件对监听列表的影响
        switch(docChange.queueType){
          //init 初始化列表
          //update 列表中的记录内容有更新，但列表已经包含的记录不变
          //enqueue 记录进入列表
          //dequeue 记录离开列表
          case 'enqueue': //记录进入列表
            chats.push(docChange.doc)
            break
        }
        this.setData({
          chats:chats.sort((x,y)=>x.sendTimeTS-y.sendTimeTS)
        })
      }
    }
  },

  onGetUserInfo(e){
    if(e.detail.userInfo){
      this.setData({
        userInfo:e.detail.userInfo
      })
    }
  },

  onTextInput(e){
    this.setData({
      textInputValue:e.detail.value
    })
  },

  onSend(){
    if(!this.data.textInputValue){
      return
    }
    const doc={
      avatar:this.data.userInfo.avatarUrl,
      nickName:this.data.userInfo.nickName,
      msgText:'text',
      textContent:this.data.textInputValue,
      sendTime:new Date(),
      sendTimeTS: Date.now(),
    }
    chatroomCollection.add({
      data:doc,
    })
    this.setData({
      textInputValue:'',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})