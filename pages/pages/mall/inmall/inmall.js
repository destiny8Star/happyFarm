// pages/mall/inmall/inmall.js
const app=getApp();
import Tips from '../../../class/methods/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    sid:'', //店铺id
    dowImg:true,   //顶部展开按钮
    mallDetail:'', //店铺信息
    bgimage:'', //商店背景图片
    goodslist: [], //商品列表
    pageN: 2,
    pageTottomText: '', //上划加载文子
  },
  //顶部按钮展开
  topBtn(){
    let dowImg = this.data.dowImg;
    this.setData({
      dowImg: !dowImg
    })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let sid=options.store_id;
    that.setData({
      sid:sid
    })
  //  Tips.loading();
    app.mall.getMallDeail(sid)
    .then(res=>{
      console.log('店铺信息',res)
      that.setData({
        mallDetail:res.data
      })
    })
    app.mall.getMGs(sid,1)
    .then(res=>{
      console.log('商品',res)
      that.setData({
        goodslist: res.data
      })
    })
    .catch(rej=>{
      console.log('商品', rej)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let sid=that.data.sid
    let pageN = this.data.pageN;
    console.log('pageN+', pageN)
    that.setData({
      pageTottomText: app.globalData.addText,
    });

    app.mall.getMGs(sid, pageN)
      .then(res => {
        console.log('商品', res)
        pageN += 1;
        that.setData({
          pageN: pageN
        })
        let goodslist = that.data.goodslist.concat(res.data)
        that.setData({
          goodslist: goodslist
        })

      })
      .catch(rej => {
        console.log('商品', rej)
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