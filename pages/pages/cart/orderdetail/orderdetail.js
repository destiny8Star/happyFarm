// pages/mine/Allorders/orderdetail/orderdetail.js
var app = getApp();
import Tips from '../../../class/methods/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '无',
    phone: '无',
    address: '无',
    province: '无', //省
    sum: '', //商品金额
    total: '', //合计
    ordDetail: '', //订单信息
    freight: 0, //运费
  },
//去购物车商品列表
  toGoods(){
     wx.navigateTo({
       url: '/pages/cart/orderdetail/goodsDetail/goodsDetail',
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    let that = this
    that.wxgetAddress()
    app.index.doAccount()
      .then(res => {
        console.log('获取商品信息', res)
        that.setData({
          ordDetail: res.data
        })
      })
  },
  getAddress() {
    let that = this
    that.wxgetAddress()
  },
  //获取地址
  wxgetAddress() {
    let that = this
    wx.chooseAddress({
      success(res) {
        app.index.getFreight(res.provinceName)
          .then(res => {
            console.log('获取运费', res)
            that.setData({
              freight: res.data.freight
            })
          })
          .catch(rej => {
            that.setData({
              freight: 0
            })
          })
        that.setData({
          name: res.userName,
          phone: res.telNumber,
          address: res.provinceName + ' ' + res.cityName + ' ' + res.countyName + ' ' + res.detailInfo,
          province: res.provinceName
        })
      },
      fail(rej) {
        console.log('取消')
        // that.setData({
        //   name: '无',
        //   phone: '无',
        //   address: '无',
        //   freight: 0
        // })
      }
    })
  },
 

  //---------------------------------------

  btnpayInto: function() {
    var that = this;
    let name = that.data.name;
    let phone = that.data.phone;
    let address = that.data.address;
    let province = that.data.province;
    if (name == '无') {
      Tips.alert('请添加地址')
    } else {
      Tips.loading()
      app.mall.getOrder(name, phone, address, province)
        .then(res => {
          Tips.loaded()
          return app.mall.doPay(res.data.total, res.data.order_sn)
        })
        .then(res => {
            console.log('支付结果', res)
            Tips.loaded()
            that.pay(res.data)
          }
        )
        .catch(rej => {
          Tips.loaded()
          console.log('失败结果', rej)
          Tips.alert('支付异常')
        })
    }
   
  },
  // 支付
  pay: function(a) {   //调用微信支付接口
    let that = this;
    Tips.loading()
    wx.requestPayment({
      'timeStamp': a.timeStamp,
      'nonceStr': a.nonceStr,
      'package': a.package,
      'signType': 'MD5',
      'paySign': a.paySign,
      'success': function(res) {
        Tips.loaded()
         console.log('支付成功',res)
         Tips.toast('支付成功',function(){
           wx.redirectTo({
             url: '/pages/mine/Allorders/Allorders?cur=0',
           })
         })
      },
      'fail': function(res) {
        Tips.loaded()
        Tips.alert('支付失败')
        setTimeout(function(){
          wx.redirectTo({
            url: '/pages/mine/Allorders/Allorders?cur=0',
          })
        },1000)
      },
    })
  },

  //----------------------------------------
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