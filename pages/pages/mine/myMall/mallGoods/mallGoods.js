// pages/mine/myMall/mallMoney/mallGoods/mallGoods.js
const app=getApp()
import Tips from '../../../../class/methods/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask:false,   //遮罩层
    goodsList:'', //商品列表
    oldPrice:'', //修改当前商品的进货价格
    gid:'' , //修改当前的商品的id
    pageTottomText: '', //上划加载文子
    pageN: 2,
  },
// 展示价格弹框
  showPrice(e){
    let old=e.currentTarget.dataset.oldp;
    let gid=e.currentTarget.dataset.gid;
     this.setData({
       showMask:true,
       oldPrice:old,
       gid:gid
     })
  },
  //隐藏
  hideMask(){
    this.setData({
      showMask: false
    })
  },
  //上下架
  changStatus(e){
    let that=this
    let gid=e.currentTarget.dataset.gid;
    Tips.loading()
    app.mall.doUp(gid)
    .then(res=>{
      Tips.loaded()
      Tips.toast('修改成功',function(){
        //我的商品库
        Tips.loading()
        app.mall.getMallStore(1)
          .then(res => {
            Tips.loaded()
            console.log('我的商品库', res)
            that.setData({
              goodsList: res.data,
              pageN: 2
              
            })
          })
      })
      console.log('上交加过',res)
    })
  },
  //修改价格
  changePrice(e){
    let that=this
    let price =e.detail.value.price
    let oldPrice=that.data.oldPrice
    let gid=that.data.gid
    console.log('eeeeee', e,oldPrice,gid)
    if (price < oldPrice){
      Tips.alert('销售价格过低')
    }else{
      Tips.loading()
      app.mall.doChangePrice(gid,price)
      .then(res=>{
        Tips.loaded()
        Tips.toast('修改成功',function(){
          //我的商品库
          Tips.loading()
          app.mall.getMallStore(1)
            .then(res => {
              Tips.loaded()
              console.log('我的商品库', res)
              that.setData({
                goodsList: res.data,
                showMask: false,
                pageN:2
              })
            })
        })
        console.log('修改',res)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
  //我的商品库
    app.mall.getMallStore(1)
    .then(res=>{
      console.log('我的商品库',res)
      that.setData({
        goodsList:res.data
      })
    })
    .catch(rej=>{
      that.setData({
        goodsList:[]
      })
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
    let pageN = this.data.pageN;
    console.log('pageN+', pageN)
    that.setData({
      pageTottomText: app.globalData.addText,
    });
    app.mall.getMallStore(pageN)
      .then(res => {
        console.log('我的商品库', res)
      
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