// pages/mall/mall.js
import Tips from '../../class/methods/Tips.js'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mallList:'', //店铺列表
    pageN:2,
    pageTottomText: '', //上划加载文子
    goodslist:'', //商品列表
  },
  //去店铺里
  toMall(e){
   let store_id=e.currentTarget.dataset.sid;
   console.log('stoid',store_id)
   wx.navigateTo({
     url: '/pages/mall/inmall/inmall?store_id='+store_id,
   })
  },
  //去商品详情
  toGoodDet(e){
    let gid=e.currentTarget.dataset.gid
    console.log('商品id',gid)
    wx.navigateTo({
      url: '/pages/index/gDetail/gDetail?id=' + gid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    app.mall.getMallList(1)
    .then(res=>{
      console.log('获取diaper',res)
      that.setData({
        mallList:res.data
      })      
    })

    //获取商品
    app.index.getGoods(1, 1)
      .then(res => {
        console.log('获取商品列表', res)
        that.setData({
          goodslist: res.data
        })
      })
      .catch(rej => console.log(rej))
  },

  //去商品详情页
  toDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/gDetail/gDetail?id=' + id,
    })
  },
  //加入购物车
  joinCart(e) {
    let sid = e.currentTarget.dataset.sid;
    let gid = e.currentTarget.dataset.gid;
    Tips.loading()
    app.index.joinCart(sid, gid)
      .then(res => {
        Tips.loaded()
        Tips.toast('加入成功')
        console.log('加入购物车', res)
      })
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
    let that=this
       Tips.loading()
       app.mall.getMallList(1)
      .then(res => {
        Tips.loaded()
        console.log('获取diaper', res)
        that.setData({
          mallList: res.data,
          pageN: 2,
        })
      })

    wx.stopPullDownRefresh()
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let pageN = this.data.pageN;
    console.log('pageN+', pageN)
    that.setData({
      pageTottomText: app.globalData.addText,
    });
    app.mall.getMallList(pageN)
      .then(res => {
        console.log('获取diaper', res)
        pageN += 1;
        that.setData({
          pageN: pageN
        })
        let mallList = that.data.mallList.concat(res.data)
        that.setData({
          mallList: mallList
        })

      })
      .catch(rej => {
        console.log(rej)
        that.setData({
          pageTottomText: '—— 我也是有底线的 ——'
        })
      })

     
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})