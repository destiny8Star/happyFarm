// pages/apply/notes/notes.js


var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
     phone:'',   //获取用户手机号
     notes:'', //协议内容
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    let that = this;
    app.auth.getMAgree()
    .then(res=>{
      console.log('获取协议',res)
      that.setData({
        notes:res.data
      })
    })
  },

  clickagree: function () {
    let phone=this.data.phone;
    if(phone){
      wx.navigateTo({
        url: '/pages/apply/verification/verification',
      })
    }else{
      wx.navigateTo({
        url: '/pages/mine/userinfo/bindingnumber/bindingnumber?mallPhone=yes',
      })
    }
  },
  onShow(){
    let that=this
    app.auth.syncUserInfo()
    .then(res=>{
      console.log('获取用户',res)
      if (res.code == 200) {
        that.setData({
          phone: res.data.phone
        })
      }
    })
  },
})