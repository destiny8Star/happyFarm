// pages/mine/wuliu/wuliu.js
const app=getApp()
import Tips from '../../../class/methods/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'', //物流信息
 
  },
  // // 复制单号
  // copyText: function(e) {
  //   console.log(e)
  //   wx.setClipboardData({
  //     data: e.currentTarget.dataset.text,
  //     success: function(res) {
  //       wx.getClipboardData({
  //         success: function(res) {
  //           wx.showToast({
  //             title: '复制成功'
  //           })
  //         }
  //       })
  //     }
  //   })
  // },
//去物流详情也
  toTransDetail(e){
    let num=e.currentTarget.dataset.num;
    let img=e.currentTarget.dataset.img
    let name = e.currentTarget.dataset.name

     wx.navigateTo({
       url: '/pages/mine/wuliu/wuliuDetail/wuliuDetail?num='+num+'&&img='+img+'&&name='+name,
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this
    let ornum=options.ornum;
    app.order.getTrans(ornum)
    .then(res=>{
      console.log('物流查询',res)
      that.setData({
        info:res.data
      })
    })
    .catch(rej=>{
      console.log(rej)
      
    })

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