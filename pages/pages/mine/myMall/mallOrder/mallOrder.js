// pages/mine/myMall/mallOrder/mallOrder.js
var app = getApp();
import Tips from '../../../../class/methods/Tips.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageTottomText: '', //上划加载文子
    pageN: 2,
    curIndex: 0,
    // 控制退款单的显示隐藏
    goodsList: [{
        id: 0,
        title: '全部',
      },
      {
        id: 1,
        title: '待发货',
      },
      {
        id: 2,
        title: '待收货',
      },
      {
        id: 3,
        title: '已完成',
      },
      {
        id: 4,
        title: '退款',
      },
    ],
    // 全部订单
    allorder: [],
    income: '', //累计收益

  },
  //去物流页面
  trans(e) {
    let ornum = e.currentTarget.dataset.ornum
    wx.navigateTo({
      url: '/pages/mine/wuliu/wuliu?ornum=' + ornum,
    })
  },
  // 分页菜单函数
  goodsSelect: function(e) {
    var that = this;
    let choose = e.currentTarget.dataset.index;
    this.setData({
      curIndex: choose,
    })
    //下面展示内容修改
    Tips.loading()
    if (choose == 0) {
      app.mall.getAllOrder(1)
        .then(res => {
          Tips.loaded()
          console.log('获取订单', res)
          that.setData({
            allorder: res.data,
            pageN: 2
          })
        })
        .catch(rej => {
          Tips.loaded()
          that.setData({
            allorder: [],
            pageN: 2

          })
        })
    } else {
      app.mall.getStaOrder(1, choose)
        .then(res => {
          Tips.loaded()
          console.log('后去订单', res)
          that.setData({
            allorder: res.data,
            pageN: 2

          })
        })
        .catch(rej => {
          Tips.loaded()
          that.setData({
            allorder: [],
            pageN: 2
          })
        })
    }
  },


  //进去详情
  godetail(e) {
    let order_number = e.currentTarget.dataset.ornum
    wx.navigateTo({
      url: '/pages/mine/myMall/mallOrder/morderdetail/morderdetail?order_number=' + order_number,
    })

  },
  //去搜索
  toSearch() {
    wx.navigateTo({
      url: '/pages/mine/myMall/mallOrder/mallOsearch/mallOsearch',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    let that = this
    let cur = opt.cur;
    that.setData({
      curIndex: cur
    })
    console.log(opt, cur)
    app.mall.getWillIncome()
      .then(res => {
        console.log('获取累计', res)
        that.setData({
          income: res.data
        })
      })
  },
  onShow: function() {
    var that = this;
    let cur = that.data.curIndex
    Tips.loading()
    if (cur == 0) {
      app.mall.getAllOrder(1)
        .then(res => {
          Tips.loaded()
          console.log('获取订单', res)
          that.setData({
            allorder: res.data,
            pageN: 2
          })
        })
        .catch(rej => {
          Tips.loaded()

          that.setData({
            allorder: [],
            pageN: 2

          })
        })
    } else {
      app.mall.getStaOrder(1, cur)
        .then(res => {
          Tips.loaded()

          console.log('后去订单', res)
          that.setData({
            allorder: res.data,
            pageN: 2

          })
        })
        .catch(rej => {
          Tips.loaded()

          that.setData({
            allorder: [],
            pageN: 2

          })
        })
    }


  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //上划加载
  onReachBottom: function() {
    let that = this;
    let cur = that.data.curIndex
    let pageN = this.data.pageN;
    console.log('pageN+', pageN)
    that.setData({
      pageTottomText: app.globalData.addText,
    });

    if (cur == 0) {
      app.mall.getAllOrder(pageN)
        .then(res => {
          console.log('获取订单', res)
          pageN += 1;
          that.setData({
            pageN: pageN
          })
          let allorder = that.data.allorder.concat(res.data)
          that.setData({
            allorder: allorder
          })

        })
        .catch(rej => {
          that.setData({
            pageTottomText: '—— 我也是有底线的 ——'
          })
        })
    } else {
      app.mall.getStaOrder(pageN, cur)
        .then(res => {
          console.log('后去订单', res)
          pageN += 1;
          that.setData({
            pageN: pageN
          })
          let allorder = that.data.allorder.concat(res.data)
          that.setData({
            allorder: allorder
          })

        })
        .catch(rej => {
          that.setData({
            pageTottomText: '—— 我也是有底线的 ——'
          })
        })
    }

  },


  //下拉刷新
  onPullDownRefresh: function() {

  },

})