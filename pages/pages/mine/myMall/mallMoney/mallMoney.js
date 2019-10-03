// pages/mine/myshop/myaccount/myaccount.js
var app = getApp()
import Tips from '../../../../class/methods/Tips.js'
Page({
  data: {
    mInfo: '', //所以钱的信息
    mDetail: '', //账户明细
    pageTottomText: '', //上划加载文子
    pageN: 2,
  },
  //去提现页面
  clickinto() {
    wx.navigateTo({
      url: '/pages/mine/myMall/mallMoney/mallMoneyTx/mallMoneyTx',
    })
  },
  //去提现详情
  detailInto(e) {
    let id = e.currentRTarget.dataset.id
    wx.navigateTo({
      url: '/pages/mine/myMall/mallMoney/mallMoneyDet/mallMoneyDet?id=' + id,
    })
  },

  onLoad: function() {

  },
  onShow: function() {
    let that = this;
    // //获取累计收益
    app.mall.getIncome()
      .then(res => {
        console.log('累计收益', res)
        that.setData({
          mInfo: res.data
        })
      })

    //账号明细
    app.mall.getRecord(1)
      .then(res => {
        console.log('账户明细', res)
        that.setData({
          mDetail: res.data,
          pageN:2
        })
      })
      .catch(rej => {
        that.setData({
          mDetail: []
        })
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    let pageN = this.data.pageN;
    console.log('pageN+', pageN)
    that.setData({
      pageTottomText: app.globalData.addText,
    });

    //账号明细
    app.mall.getRecord(pageN)
      .then(res => {
        console.log('账户明细', res)
        pageN += 1;
        that.setData({
          pageN: pageN
        })
        let mDetail = that.data.mDetail.concat(res.data)
        that.setData({
          mDetail: mDetail
        })

      })
      .catch(rej => {
        that.setData({
          pageTottomText: '—— 我也是有底线的 ——'
        })
      })
  },

})