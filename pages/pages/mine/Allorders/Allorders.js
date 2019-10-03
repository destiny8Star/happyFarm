// pages/mine/Allorders/Allorders.js
var app = getApp();
import Tips from '../../../class/methods/Tips.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageTottomText: '', //上划加载文子
    pageN: 2,
    curIndex: 0,  //当前选择
    goodsList: [{
        id: 0,
        title: '全部',
      },
      {
        id: 1,
        title: '待支付',
      },
      {
        id: 2,
        title: '待发货',
      },
      {
        id: 3,
        title: '待收货',
      },
      {
        id: 4,
        title: '已完成',
      },
    ],
    // 全部订单
    allorder: [],
  },
//去物流页面
  trans(e){
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
      app.order.getAllOrder(1)
        .then(res => {
          Tips.loaded()
          console.log('获取订单', res)
          that.setData({
            allorder: res.data,
            pageN:2
          })
        })
        .catch(rej => {
          Tips.loaded()
          that.setData({
            allorder: [],
          })
        })
    } else {
      app.order.getStaOrder(1, choose)
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
          })
        })
    }
  },
//继续支付
  conPay(e){
    let that=this
  //  console.log('eeeeeee',e,cur)
    let fee = e.currentTarget.dataset.ormoney
    let ord = e.currentTarget.dataset.ornum
    Tips.loading()
    app.mall.doPay(fee,ord)
    .then(res=>{
      Tips.loaded()
    console.log('支付',res)
    that.pay(res.data)
    })

  },
  // 微信支付
  pay: function (a) {   //调用微信支付接口
    let that = this;
    
    Tips.loading()
    wx.requestPayment({
      'timeStamp': a.timeStamp,
      'nonceStr': a.nonceStr,
      'package': a.package,
      'signType': 'MD5',
      'paySign': a.paySign,
      'success': function (res) {
        Tips.loaded()
        console.log('支付成功', res)
        Tips.toast('支付成功', function () {
          that.fresh()     //刷新
        })
      },
      'fail': function (res) {
        Tips.loaded()
        Tips.alert('支付失败')
      
      },
    })
  },
  //删除订单
  deleteInto(e){
    let that=this
    let ord = e.currentTarget.dataset.ornum
    Tips.confirm('删除订单后不可恢复，确认删除?','','删除订单提示')
    .then(res=>{
      Tips.loading()
      app.order.delOrder(ord)
      .then(res=>{
        Tips.loaded();
        Tips.toast('删除成功',function(){
          that.fresh()
        })
      })
     
    })
    .catch(rej=>{
       console.log('取消',rej)
    })
  },
  //确认收货
  confirm(e) {
    let that = this
    let ord = e.currentTarget.dataset.ornum
    Tips.confirm('操作不可撤回，请确保您已收到商品?', '', '收货提示')
      .then(res => {
        Tips.loading()
        app.order.confirmOrder(ord)
          .then(res => {
            Tips.loaded();
            Tips.toast('操作成功', function () {
              that.fresh()
            })
          })
      })
      .catch(rej => {
        console.log('取消', rej)
      })
  },
  //根据cur刷新数据，并且让page=2
  fresh(){
    let that=this
    let cur = that.data.curIndex
    if (cur == 0) {              //支付成功，
      Tips.loading()
      app.order.getAllOrder(1)
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
            curIndex: cur,
            pageN: 2

          })
        })
    } else {
      Tips.loading()
      app.order.getStaOrder(1, cur)
        .then(res => {
          Tips.loaded()
          console.log('后去订单', res)
          that.setData({
            allorder: res.data,
            curIndex: cur,
            pageN: 2
          })
        })
        .catch(rej => {
          Tips.loaded()
          that.setData({
            allorder: [],
            curIndex: cur,
            pageN: 2
          })
        })
    }
  },


  //进去详情
  godetail(e) {
    let order_number = e.currentTarget.dataset.ornum
    wx.navigateTo({
      url: '/pages/mine/Allorders/orderdetail/orderdetail?order_number=' + order_number,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    let that=this
    let cur=opt.cur;
    that.setData({
      curIndex:cur
    })
    console.log(opt,cur)
    
  },
  onShow: function() {
    var that = this;
    let cur = that.data.curIndex
    Tips.loading()
    if (cur == 0) {
      app.order.getAllOrder(1)
        .then(res => {
          Tips.loaded()
          console.log('获取订单', res)
          that.setData({
            allorder: res.data,
            pageN:2
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
      app.order.getStaOrder(1, cur)
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
  //下拉刷新
  onPullDownRefresh: function() {
    let that = this
    
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
      app.order.getAllOrder(pageN)
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
      app.order.getStaOrder(pageN, cur)
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

})