// pages/index/search/search.js
import Tips from '../../../class/methods/Tips.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageN: 2,
    // 底部加载信息
    pageTottomText: '',
    // shoplist: [],
    // arr2: [],
    hot_its:[],  //热门
    servers: [], //search返回结果
    searchText: '',
    searchboxs: [], //搜索纪录
   
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
  onLoad: function(options) {
     let that=this
     app.index.getHotSearch()
     .then(res=>{
       console.log('获取热门',res)
       that.setData({
         hot_its:res.data
       })
     })
    app.index.getHisSearch()
      .then(res => {
        console.log('获取历史', res)
        that.setData({
          searchboxs: res.data
        })
      })
  },


  // 搜索框控制函数
  bindseInput: function(e) {
    let that = this;
    that.setData({
      searchText: e.detail.value
    });

  },


  // 请求数据
  reData: function(e) {
    let that = this;
    let searchText = this.data.searchText;
    if (searchText != '') {
       Tips.loading();
      app.index.getSGList(1,searchText)
      .then(res=>{
        Tips.loaded();
        console.log('获取商品',res)
        that.setData({
          servers:res.data,
          pageN: 2
        })
      }).catch(rej=>{
        Tips.loaded();
        Tips.alert('暂无结果')
      })
      
    }
  },


  //热门搜索
  his_search(e) {
    console.log('搜索的his', e)
    let that = this;
    let searchText = e.currentTarget.dataset.hot;
    Tips.loading();
    app.index.getSGList(1, searchText)
      .then(res => {
        Tips.loaded();
        console.log('获取商品', res)
        that.setData({
          servers: res.data,
          searchText: searchText,
          pageN:2
        })
      }).catch(rej => {
        Tips.loaded();
        Tips.alert('暂无结果')
      })
   
  },

  //清除历史

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   //热门
   let that=this
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
    let that = this;
    let searchText = this.data.searchText;
    let pageN = this.data.pageN;
    console.log('pageN+', pageN)
    that.setData({
      pageTottomText: app.globalData.addText,
    });

    app.index.getSGList(pageN, searchText)
      .then(res => {
        console.log('获取商品', res)
        pageN += 1;
        that.setData({
          pageN: pageN
        })
        let servers = that.data.servers.concat(res.data)
        that.setData({
          servers: servers
        })
      }).catch(rej => {
        console.log(rej)
        that.setData({
          pageTottomText: '—— 我也是有底线的 ——'
        })
      })



  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})