// pages/mine/myshop/changeinformation/basicinfo/basicinfo.js
let app = getApp();
import Tips from '../../../../class/utils/Tips.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
   mallInfo:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */

  // 保存图片
  // -------- 点击图片放大 保存 -------
  // previewImage: function (e) {
  //   console.log(e)
  //   var that = this
  //   let images = e.currentTarget.dataset.image;
  //   console.log('图片数据', images)
  //   wx.previewImage({
  //     current: "that.data.imgUrl",
  //     urls: images.split(',')
  //     // 需要预览的图片http链接 使用split把字符串转数组。不然会报错 
  //   })
  // },

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
    let mallInfo= this.data.mallInfo
    let store_id = this.data.mallInfo.id;
    let auth=wx.getStorageSync('auth')
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
          url: app.globalData.api + 'storeAvatarUpdate',
          filePath: tempFilePaths[0],
          name: 'files',
          // header: { "content-type": "multipart/form-data" },
          method: "post",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          formData: {
            store_id: store_id,
            token:auth.token,
            openid:auth.openid.openid
          },
          success: function (res) {
            Tips.loaded()
            console.log('修改头像结果',res)
           let data=JSON.parse(res.data)
            if(data.code==200){
              mallInfo.store_avatar = tempFilePaths[0]
              that.setData({
                mallInfo: mallInfo
              })
              Tips.toast('头像修改成功')
            }else{
              Tips.alert('头像修改失败')

            }
          },
          fail: function () {
            return false;
          }
        })

      } ,
      fail: function () {
        Tips.loaded()
        return false;
      }
    })
  },

  onLoad: function (options) {
    let that = this
    app.mall.getMallInfo()
      .then(res => {
        console.log('获取店铺信息', res)
        that.setData({
          mallInfo: res.data
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

  //提交
  formSubmit(e) {
    let introduce = e.detail.value.textShore;
    let mallInfo=this.data.mallInfo;
    let store_id = mallInfo.id
    let that=this
    Tips.loading();
    app.mall.changShore(store_id,introduce)
    .then(res=>{
      Tips.loaded()
      console.log('修改结果',res)
      if(res.code==200){
          Tips.toast('修改成功',function(){
            wx.navigateBack({
              delta:1
            })
          })
      }
    })
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