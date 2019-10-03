// pages/shouquan/shouquan.js
const app = getApp()
import Tips from '../../class/utils/Tips.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //授权登录 
  getUserInfo(e) {
    console.log(e)
    Tips.loading();
    app.auth.getCode()
      .then(res => app.auth.login(res))
      .then(res => app.auth.saveAuthInfo(res))
      .then(res => {
        let userInfo = e.detail.userInfo;
        return app.auth.sendInfo(res, userInfo)
      })
      .then(res => {
        if (res.code == 200) {
          return app.auth.syncUserInfo(res)
        }
      })
      .then(res=>{
         console.log('保存了信息',res)
         Tips.loaded();
         if(res.code==200){
           Tips.toast('授权成功!',function(){
             wx.reLaunch({
               url: '/pages/index/index',
             })
           })
         }else{
           Tips.alert('授权失败!')
         }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})