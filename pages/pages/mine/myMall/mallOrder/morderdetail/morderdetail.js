// pages/mine/Allorders/orderdetail/orderdetail.js
var app = getApp();
import Tips from '../../../../../class/methods/Tips.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allInfo:'', //订单信息
    ord:'', //穿过来的订单号
  },
  //去订单商品列表
  toGoods(e) {
    let ord=this.data.ord
    let sord=e.currentTarget.dataset.sord
    wx.navigateTo({
      url: '/pages/cart/orderdetail/goodsDetail/goodsDetail?ord=' + ord +'&&sord=' + sord,
    })
  },
  //去物流页面
  trans(e) {
    let ornum = e.currentTarget.dataset.ornum
    wx.navigateTo({
      url: '/pages/mine/wuliu/wuliu?ornum=' + ornum,
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var that = this;
    let ord = opt.order_number
    that.setData({
      ord:ord
    })
  
  },


  //----------------------------------------
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this
    let  ord=that.data.ord
    Tips.loading()
    app.mall.getSODetail(ord)
      .then(res => {
        Tips.loaded()
        console.log('订单详情', res)
        that.setData({
          allInfo: res.data
        })
      })
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