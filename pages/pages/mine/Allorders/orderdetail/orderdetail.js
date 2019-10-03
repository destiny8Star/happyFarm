// pages/mine/Allorders/orderdetail/orderdetail.js
var app = getApp();
import Tips from '../../../../class/methods/Tips.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allInfo:'', //订单信息
    ord:'', //穿过来的订单号
  },
  //去订单商品列表
  toGoods() {
    let ord=this.data.ord
    wx.navigateTo({
      url: '/pages/cart/orderdetail/goodsDetail/goodsDetail?ord='+ord,
    })
  },
  //去物流页面
  trans(e) {
    let ornum = e.currentTarget.dataset.ornum
    wx.navigateTo({
      url: '/pages/mine/wuliu/wuliu?ornum=' + ornum,
    })
  },
  //继续支付
  btnpaycon(e){
    let that = this
    console.log('eeeeeee', e)
    let fee = e.currentTarget.dataset.ormoney
    let ord = e.currentTarget.dataset.ornum
    Tips.loading()
    app.mall.doPay(fee, ord)
      .then(res => {
        Tips.loaded()
        console.log('支付', res)
        that.pay(res.data)
      })

  },
  // 微信支付
  pay:function (a) {   //调用微信支付接口
    let that = this;
    console.log('啊啊啊啊啊啊啊啊',a)
    Tips.loading()
    wx.requestPayment({
      'timeStamp': a.timeStamp,
      'nonceStr': a.nonceStr,
      'package': a.package,
      'signType': 'MD5',
      'paySign': a.paySign,
      'success': function (res) {
        Tips.loaded()
        console.log('支付成功', res)
        Tips.loading('支付成功', function () {
          that.onShow()
          // Tips.loading()
          // app.order.getOrdDetail(ord)
          //   .then(res => {
          //     Tips.loaded()
          //     console.log('订单详情', res)
          //     that.setData({
          //       allInfo: res.data
          //     })
          //   })
        })
      },
      'fail': function (res) {
        Tips.loaded()
        Tips.alert('支付失败')

      },
    })
  },
  //删除订单
  btndeleteInto(e) {
    let that = this
    
    let ord = e.currentTarget.dataset.ornum
    Tips.confirm('删除订单后不可恢复，确认删除?', '', '删除订单提示')
      .then(res => {
        Tips.loading()
        app.order.delOrder(ord)
          .then(res => {
            Tips.loaded();
            Tips.toast('删除成功', function () {
              that.onShow()
            })
          })
      })
      .catch(rej => {
        console.log('取消', rej)
      })
  },
  //申请退款
  toRefund(e){
    let ord = e.currentTarget.dataset.ornum
    wx.navigateTo({
      url: '/pages/mine/refund/refund?ord='+ord,
    })
  },
  //确认收货
  confirm(e){
    let that = this
    let ord = e.currentTarget.dataset.ornum
    Tips.confirm('操作不可撤回，请确保您已收到商品?', '', '收货提示')
      .then(res => {
        Tips.loading()
        app.order.confirmOrder(ord)
          .then(res => {
            Tips.loaded();
            Tips.toast('操作成功', function () {
              that.onShow()
            })
          })
      })
      .catch(rej => {
        console.log('取消', rej)
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
    app.order.getOrdDetail(ord)
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