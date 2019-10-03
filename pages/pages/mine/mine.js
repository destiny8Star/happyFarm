// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statu: 2,
    hide: '', //隐藏功能
    percent: 0,
    userInfo:'',
    navtop: [{
      icon: '/imgs/img/me_btn1@2x.png',
      menu_name: '待付款',
      id: 1
    }, {
      icon: '/imgs/img/me_btn2@2x.png',
      menu_name: '待发货',
      id: 2

    }, {
      icon: '/imgs/img/me_btn3@2x.png',
      menu_name: '待收货',
      id: 3

    }, {
      icon: '/imgs/img/me_btn4@2x.png',
      menu_name: '已完成',
      id: 4

    }],

    itemarray: [{
      imgss: '/imgs/img/me_btn5@2x.png',
      name: '我的农场',
      id: 1,
    }, {
      imgss: '/imgs/img/me_btn7@2x.png',
      name: '地址管理',
      id: 2
    }],

    // 我的代理商
    itemarray1: [{
      imgss: '/imgs/img/me_btn5@2x.png',
      name: '我的农场',
      id: 1,
    }, {
      imgss: '/imgs/img/me_btn7@2x.png',
      name: '地址管理',
      id: 2
    }, {
      imgss: '/imgs/img/me_btn6@2x.png',
      yongjin: '查看赚取的佣金~',
      name: '我的店铺',
      id: 3
    }],
    // 我的店铺被冻结
    itemarray2: [{
      imgss: '/imgs/img/me_btn5@2x.png',
      name: '我的农场',
      id: 1,
    }, {
      imgss: '/imgs/img/me_btn7@2x.png',
      name: '地址管理',
      id: 2
    }, {
      imgss: '/imgs/img/me_btn6@2x.png',
      yongjin: '您的店铺已被冻结，请联系客服!',
      name: '我的店铺',
      id: 0
    }],

  },


  // 查看并修改个人信息
  userinfo: function() {
    wx.navigateTo({
      url: '/pages/mine/userinfo/userinfo',
    })
  },

  // 申请成为代理
  applyInto: function() {
    wx.navigateTo({
      url: '/pages/mine/applyInto/applyInto',
    })
  },
  //等待审核
  tosuccess(){
    wx.navigateTo({
      url: '/pages/apply/success/success',
    })
  },

  //  * 生命周期函数--监听页面加载
  //  */
  onLoad: function(options) {
    let that = this
   
  },




  detailInto: function(e) {
    // console.log('r', e)
    let id = e.currentTarget.dataset.id;
    if (id == 1) {
      wx.navigateTo({
        url: '/pages/about/about',
      })
    } else if (id == 2) {
      wx.chooseAddress({
        success(res) {
          console.log(res.userName)
          console.log(res.postalCode)
          console.log(res.provinceName)
          console.log(res.cityName)
          console.log(res.countyName)
          console.log(res.detailInfo)
          console.log(res.nationalCode)
          console.log(res.telNumber)
        }
      })
    } else if (id == 3) {
      wx.navigateTo({
        url: '/pages/mine/myMall/myMall',
      })
    }
  },



  // 查看订单
  moreInto: function(e) {
    let cur =e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/mine/Allorders/Allorders?cur='+cur,
    })
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
    let that = this
    app.auth.syncUserInfo().then(res => {
      console.log('获取用户信息', res)
      if (res.code == 200) {
        that.setData({
          userInfo: res.data
        })
      }
    })
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