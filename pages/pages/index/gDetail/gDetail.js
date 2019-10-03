// pages/index/gDetail/gDetail.js
const app=getApp()
import Tips from '../../../class/methods/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'', //商家身份状态
    showB: false, //显示弹框价格
    gdetail:'', //商品详情
    isLaunch:false, //是否展开详情
    sellMoney:'', //设置售价
    // hm:'', //是否是有店铺展示
  },
  //展开详情
  launch(){
       let isLaunch=this.data.isLaunch;
        this.setData({
          isLaunch:!isLaunch
        })
  },
  // 去商店
  toMall(e) {
    let store_id = e.currentTarget.dataset.sid;
    console.log('stoid', store_id)
    wx.navigateTo({
      url: '/pages/mine/myMall/mallGoods/mallGoods?store_id=' + store_id,
    })
  },

  // 返回到首页
  indexInto: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  // 去购物车
  toCart: function() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  //显示弹框价格
  showAgent() {
    this.setData({
      showB: true
    })
  },
  //隐藏弹框价格
  hideAgent() {
    this.setData({
      showB: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this
    let id=options.id
    // let hasMall=options.hm||'no'
    // console.log('hasMall', hasMall)
    // that.setData({
    //   hm:hasMall
    // })
    Tips.loading()
   app.index.getGoodDetail(id)
   .then(res=>{
     Tips.loaded()
     console.log('获取商品详情',res)
     that.setData({
       gdetail:res.data
     })
   })
//获取当前商家状态
  let userInfo=wx.getStorageSync('user')
    console.log('statusssssssss', userInfo)
   that.setData({
     userInfo: userInfo
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
//设置售价
  setMoney(e){
    let money=e.detail.value;
    this.setData({
      sellMoney:money
    })
  },
  //代理
  dls(e){
    let that=this
    let gid=e.currentTarget.dataset.gid
    let money = Number(this.data.sellMoney)
    let enterMoney = Number(this.data.gdetail.stock_price)
    console.log('money', gid, typeof(money), typeof(enterMoney), money >= enterMoney)
    if (money >= enterMoney){
      Tips.loading()
      app.mall.doagent(gid,money)
      .then(res=>{
        Tips.loaded();
        Tips.toast('代理成功', function () {
          that.setData({
            showB:false,
            sellMoney:''
          })
        })
        
      })
      .catch(rej=>{
        Tips.loaded();
        Tips.toast('请勿重复代理', function () {
          that.setData({
            showB:false,
            sellMoney:''
          })
        })
      
      })
    }else{
      Tips.alert('请输入合理价格')
    }

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