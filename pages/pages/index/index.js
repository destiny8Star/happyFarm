//index.js
//获取应用实例
const app = getApp()
import Tips from '../../class/methods/Tips.js'
Page({
  data: {
    changeSty: 0, //默认选择第一个banner
    selTab: 1, //选中的tab
    indexTab: [],
    banner: [], //banner图片
    goodslist: [],
    pageN: 2,
    pageTottomText: '' //上拉加载
  },
  //顶部选择tab
  selT(e) {
    let that = this
    let id = e.currentTarget.dataset.id;
    this.setData({
      selTab: id,
      pageN: 2,
      pageTottomText: ''
    })
    Tips.loading()
    app.index.getGoods(1, id)
      .then(res => {
        Tips.loaded()
        console.log('获取商品列表', res)
        that.setData({
          goodslist: res.data
        })
      })
      .catch(rej=>{
        Tips.loaded()
        Tips.alert('暂无商品')
        that.setData({
          goodslist: []
        })
      })
  },
  //改变样式
  changeSty(e) {
    //  console.log('eeeee',e)
    this.setData({
      changeSty: e.detail.current
    })
  },
  //去搜索也
  toSearch() {
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },
  //去商品详情页
  toDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/gDetail/gDetail?id=' + id,
    })
  },
  //去游戏页面
  togame(){
   wx.navigateTo({
     url: '/pages/about/about',
   })
  },
  //去banner详情
  toBan() {
    wx.navigateTo({
      // url: '/pages/index/gBanner/gBanner',
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
  onLoad() {

    let that = this
    let ind = that.data.selTab
    let auth = wx.getStorageSync('auth');
    if (auth == '') {
      wx.reLaunch({
        url: '/pages/shouquan/shouquan',
      })
    } else {
      app.index.getBanner()
        .then(res => {
          console.log('获取banner', res)
          that.setData({
            banner: res.data
          })
        })
      app.index.getGoodType()
        .then(res => {
          console.log('获取商品类型', res)
          that.setData({
            indexTab: res.data
          })
        })

      app.index.getGoods(1, ind)
        .then(res => {
          console.log('获取商品列表', res)
          that.setData({
            goodslist: res.data
          })
        })
        .catch(rej => console.log(rej))
    }
  },
  onShow() {
    let that = this;
    let ind = that.data.selTab


  },
  //上拉加载
  onReachBottom() {
    let that = this;
    let ind = that.data.selTab
    let pageN = this.data.pageN;
    console.log('pageN+', pageN)
    that.setData({
      pageTottomText: app.globalData.addText,
    });

    app.index.getGoods(pageN, ind)
      .then(res => {
        console.log('获取商品列表', res)
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
        console.log(rej)
        that.setData({
          pageTottomText: '—— 我也是有底线的 ——'
        })
      })

  }
})