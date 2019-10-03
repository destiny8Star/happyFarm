// pages/mine/applyInto/applyInto.js
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  applyInto: function() {
    wx.navigateTo({
      url: '/pages/apply/notes/notes'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this
    app.auth.getMImage()
    .then(res=>{
      that.setData({
        url:res.data.image
      })
    })
  }
})