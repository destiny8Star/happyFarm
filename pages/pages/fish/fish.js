
var waterSetInterval;
import Tips from '../../class/methods/Tips.js'
const app = getApp()
Page({

  data: {
    myInfo: '', //我的农场信息
    Seedfarm: false, //判断用户第一次进来选择种子
    waterOpcity: 0, //浇水动画
    waterTop: 300, //浇水动画
    waterCartoon: false, //动画遮罩
    fishRight: 0,
    widthScreen: 0, //屏幕宽度    
    ii : 0,
    sign: false, //签到
    friend: [], //助力好友
    gain: false,  //收获
    fromF: false, //是否来自助力好友
    friendSuc: false,//好友助力成功
    FriendInfo: '', //好友的信息
    msgList: []
  },
  // selectOnclick() {
  //   wx.showToast({
  //     title: '领取成功',
  //   })
  //   this.setData({
  //     Seedfarm: false
  //   })
  // },
  //签到
  toSign() {
    let that = this
    Tips.loading()
    app.game.doSign()
      .then(res => {
        Tips.loaded()
        that.setData({
          sign: true
        })
        console.log('签到成功', res)
      })
      .catch(rej => {
        Tips.loaded()
        Tips.alert('今天已签到')
        console.log('已经签到', rej)
      })

  },
  hideSign() {
    let that = this
    that.setData({
      sign: false
    })
  },
  //吃饲料动画
  drop() {
    var that = this
    let oid = wx.getStorageSync('auth').openid.openid
    app.game.dogrow(oid)
      .then(res => {
        var waterTop = that.data.waterTop
        waterSetInterval = setInterval(function () {
          waterTop += 35
          that.setData({
            waterOpcity: 1,
            waterTop: waterTop,
            waterCartoon: true,
          })
        }, 500)
        setTimeout(function () {
          clearInterval(waterSetInterval);
          that.setData({
            waterOpcity: 0,
            waterTop: 300,
            waterCartoon: false
          })
          //刷新
          that.onShow()
        }, 2000)
      })
      .catch(rej => {
        console.log('浇水失败结果', rej)
        Tips.alert('明天再来哦~')
      })
  },
  //友人助力吃饲料动画
  dropFriend() {
    var that = this
    let FriendInfo = that.data.FriendInfo
    console.log('0000000000', FriendInfo)
    app.game.dogrowF(FriendInfo)
      .then(res => {
        var waterTop = that.data.waterTop
        waterSetInterval = setInterval(function () {
          waterTop += 35
          that.setData({
            waterOpcity: 1,
            waterTop: waterTop,
            waterCartoon: true,
          })
        }, 500)
        setTimeout(function () {
          clearInterval(waterSetInterval);
          that.setData({
            waterOpcity: 0,
            waterTop: 300,
            waterCartoon: false
          })
          //刷新
          that.onShow()
        }, 2000)
      })
      .then(res => {
        that.setData({
          friendSuc: true
        })
      })
      .catch(rej => {
        console.log('浇水失败结果', rej)
        Tips.alert('明天再来哦~')
      })
  },
  //去我的农场
  toMyfarm() {
    wx.redirectTo({
      url: '/pages/about/about',
    })
  },
  onLoad: function (options) {
    // 获取屏蔽宽
    let that = this
    console.log('options', options)

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          widthScreen: res.screenWidth
        })
      },
    })
    //获取公告
    app.game.getNotice()
      .then(res => {
        console.log('获取公告', res)
        that.setData({
          msgList:res.data
        })
      })
    //分享进入小程序的状态
    if (options.share) {
      that.setData({
        fromF: true,
        FriendInfo: JSON.parse(options.share)
      })
    }
  },
  onShow() {
    let that = this
    let fromF = that.data.fromF
    console.log('是否来自f', fromF)
    if (fromF) {
      let FriendInfo = that.data.FriendInfo
      console.log('有人信息', FriendInfo)

      let data = {
        token: FriendInfo.token,
        openid: FriendInfo.openid.openid
      }
      console.log('data', data)
      //好友农场
      wx.request({
        url: app.globalData.api + 'userFarm',
        method: 'GET',
        data: data,
        success: (res) => {
          console.log('获取农场信息', res)
          that.setData({
            myInfo: res.data.data
          })
        },

      })
      //Z护理好友
      wx.request({
        url: app.globalData.api + 'farmHelp',
        method: 'GET',
        data: data,
        success: (res) => {
          console.log('有人农场助力人', res)
          that.setData({
            friend: res.data.data
          })
        },

      })
    } else {
      app.game.judgeSeed()
        .then(res => {
          console.log('判断是否领取种子', res)
            console.log('不用领取种子')
            that.setData({
              myInfo: res.data
            })
        })
        .catch(rej => {
          console.log('农场失败信息', rej)
       
        })
      //Z护理好友
      app.game.getFriend()
        .then(res => {
          console.log('获取主力好友', res)
          that.setData({
            friend: res.data
          })
        })
        .catch(rej => {
          console.log('暂无好友助力', rej)
        })
    }

  },

//鱼儿游动动画
  onReady: function () {
    var that = this;
    var i = 0
    const animationCloudData = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease',
    })
    animationCloudData.translate(-100, 60).step().translate(-200, 0).step().rotateY(-180).step({ duration: 650 }).translate(0, 0).step().rotateY(0).step({ duration : 650 })
    that.setData({
      animationCloudData: animationCloudData
    })
    setInterval(() => {
      animationCloudData.translate(-100, 100).step().translate(-200, 0).step().rotateY(-180).step().translate(0, 0).step().rotateY(0).step()
      that.setData({
        animationCloudData: animationCloudData
      })
    }, 20000)
  },


  // // 用户点击右上角分享
  // onShareAppMessage: function (res) {
  //   if (res.from === 'button') { }
  //   return {
  //     title: '开心农场',
  //     path: '/pages/freeclick/freeclick?share=' + JSON.stringify(shop),
  //     success: function (res) {
  //       console.log('转发成功')

  //     }
  //   }
  // }
  //收获
  showGain() {
    let that = this
    that.setData({
      gain: true
    })
  },
  //选择收获地址
  chooseAddr() {
    let that = this
    let id = that.data.myInfo.id
    wx.chooseAddress({
      success(res) {
        let name = res.userName;
        let phone = res.telNumber;
        let address = res.provinceName + ' ' + res.cityName + ' ' + res.countyName + ' ' + res.detailInfo;
        Tips.confirm('请确认您的收货信息，点击确定我们将会为您发货。收货人：(' + name + ');手机号：(' + phone + ');详细地址：(' + address + ')', '')
          .then(res => {
            app.game.doReap(id, name, phone, address)
              .then(res => {
                Tips.toast('提交成功', function () {
                  // that.setData({
                  //   gain: false
                  // });
                  // that.onShow()
                  wx.redirectTo({
                    url: '/pages/about/about',
                  })
                })
              })


          })
          .catch(rej => {
            console.log('点击取消', rej)
            that.setData({
              gain: false
            })
          })
      },
      fail(rej) {
        console.log('取消')
        that.setData({
          gain: false
        })
      }
    })
  },
  // 用户点击右上角分享
  onShareAppMessage(res) {
    let fInfo = wx.getStorageSync('auth')
    if (res.from === 'button') {
      console.log(res)
    }
    console.log('info', fInfo)
    return {
      title: '开心农场',
      path: '/pages/fish/fish?share=' + JSON.stringify(fInfo),
      success: function (res) {
        console.log('转发成功', res)

      }
    }
  },

  //去好友农场
  toFriFarm(e) {
    let openid = e.currentTarget.dataset.opid
    let token = wx.getStorageSync('auth').token
    let fInfo = {
      openid: {
        openid: openid
      },
      token: token
    }
    wx.navigateTo({
      url: '/pages/about/about?share=' + JSON.stringify(fInfo),
    })
  },
  //返回首页
  toHome() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
})