// pages/cart//orderdetail/goodsDetail/goodsDetail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:'' , //商品列表
    mgoodsList:'', //店铺商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.log('options',options)
    let ord=options.ord
    let sord=options.sord
    if(sord){
      app.mall.getSDgoods(ord,sord)
      .then(res=>{
        console.log('店铺的商品详情', res)
        that.setData({
          mgoodList: res.data
        })
      })
    } else if (ord){
      app.order.getOrderGoods(ord)
        .then(res => {
          console.log('用户的商品详情', res)
          that.setData({
            goodList: res.data
          })
        })
    }else{
      app.index.getCartGoods()
        .then(res => {
          console.log('获取', res)
          that.setData({
            goodList: res.data
          })
        })
    }
 
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