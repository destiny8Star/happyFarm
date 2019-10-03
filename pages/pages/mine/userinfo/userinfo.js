// pages/mine/userinfo/userinfo.js
const app=getApp();
import Tips from '../../../class/methods/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',   //个人信息
  },
  //获取个人信息
  getInfo(){
    let that=this
    app.auth.syncUserInfo().then(res => {
      console.log('获取用户信息', res)
      if (res.code == 200) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },
  // 头像修改函数
  headImg: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要修改头像吗',
      success: function (res) {
        if (res.confirm) {
          that.headUpdate()
        } else if (res.cancel) { }
      }
    })
  },
  headUpdate: function () {
    let auth = wx.getStorageSync('auth')
    let userInfo=this.data.userInfo
    let that = this;
    Tips.loading()
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.api + 'avatarUpdate',
          filePath: tempFilePaths[0],
          name: 'files',
          // header: { "content-type": "multipart/form-data" },
          method: "post",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          formData: {
            token: auth.token,
            openid: auth.openid.openid
          },
          success: function (res) {
            Tips.loaded()
            console.log('修改头像结果', res)
            let data = JSON.parse(res.data)
            if (data.code == 200) {
              userInfo.avatar = tempFilePaths[0]
              that.setData({
                userInfo: userInfo
              })
              Tips.toast('头像修改成功')
            } else {
              Tips.alert('头像修改失败')

            }
          },
          fail: function () {
            return false;
          }
        })

      },
      fail: function () {
        Tips.loaded()
        return false;
      }
    })
  },
  //保存
  teformSubmit(){
    Tips.toast('保存成功',function(){
      wx.navigateBack({
        delta:1
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

// 去绑定手机号
  phoneInto:function(){

    wx.navigateTo({
      url: '/pages/mine/userinfo/bindingnumber/bindingnumber',
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
    this.getInfo()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})