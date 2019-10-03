// pages/mine/myMall/mallOrder/mallOsearch/mallOsearch.js
const app=getApp()
import Tips from '../../../../../class/methods/Tips.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'选择日期',
    date2: '选择日期',
    info:[], //信息列表
  },
  //日期选择
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },
  //查询
  search(){
      let that=this
    let start = that.data.date
      let end=that.data.date2
      Tips.loading()

    app.order.searchCustom(start,end)
    .then(res=>{
      Tips.loaded()
      console.log('获取信息',res)
      that.setData({
          info:res.data
      })
    })
    .catch(rej=>{
      Tips.loaded()
      Tips.alert('获取失败');
      console.log('失败',rej)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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