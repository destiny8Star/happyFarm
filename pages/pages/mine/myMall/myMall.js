// pages/mine/myMall/myMall.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dowImg: true,   //顶部展开按钮
    mallInfo:'',  //店铺信息
    bgimage:'',  //背景图片
    goods:'', //商品列表
  },
  //顶部按钮展开
  topBtn() {
    let dowImg = this.data.dowImg;
    this.setData({
      dowImg: !dowImg
    })
  },
  //去店铺信息
  toMallinfo(){
   wx.navigateTo({
     url: '/pages/mine/myMall/mallInfo/mallInfo',
   })
  },
  //去提现页面
  toTx(){
     wx.navigateTo({
       url: '/pages/mine/myMall/mallMoney/mallMoney',
     })
  },
  //去代理商品页面
  toGoods(){
    wx.navigateTo({
      url: '/pages/mine/myMall/mallGoods/mallGoods',
    })
  },
  //去订单页面
  toOrder(e) {
    let cur=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/mine/myMall/mallOrder/mallOrder?cur='+cur,
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
    let that=this
    app.mall.getMallInfo()
    .then(res=>{
      console.log('获取店铺信息',res)

      that.setData({
        mallInfo:res.data
      })
    //获取商品
      return app.mall.getMGs2(res.data.id)
    })
    .then(res=>{
      console.log('获取商品',res )
      that.setData({
        goods: res.data
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