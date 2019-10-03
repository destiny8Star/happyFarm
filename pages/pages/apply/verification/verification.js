// pages/apply/verification/verification.js
var app = getApp()
// 地址相关数据---------------------
import Tips from '../../../class/methods/Tips.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    params: [],
    imgbox3: [], //身份证正面
    imgnum: 0,
    imgbox4: [], //身份证反面
    // moshi: ["自助", "充值"],   // 代理模式
    // moshiindex: 0,
    // ms_:'', //选择的模式

    index: 0,
    //所在区域三级联动
    region: ['北京市', '北京市', '东城区'],
    mycode: '',
    // myaddress: ['浙江省', '杭州市', '江干区'],
    img: '/imgs/img/idpic_upload1@2x.png',
    imgs1: '/imgs/img/idpic_upload2@2x.png',
    phone: '',
    // id: ''
  },
 
  //所在区域一级联动
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  // 模式选择
  // moshiChange: function (e) {
  //   let that = this
  //   console.log('携带值为', e.detail.value)

  //   let index = e.detail.value
  //   console.log(that.data.moshi[index])
  //   let ms_ = that.data.moshi[index]
  //   that.setData({
  //     moshiindex: e.detail.value,
  //     ms_: ms_
  //   })
  // },

  // 添加正面图片
  addimage_f: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let data = res.tempFilePaths;
        // console.log(data)
        let arr;
        arr = that.data.imgbox3.concat(data)
        console.log('图片', arr)
        that.setData({
          imgbox3: arr
        })
      }
    })
  },
  // 添加反面图片
  addimage_r: function (e) {
    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let data = res.tempFilePaths;
        let arr;
        arr = that.data.imgbox4.concat(data)
        console.log('图片4',arr)
        that.setData({
          imgbox4: arr
        })
      }
    })
  },

  // 删除正面上传的图片
  delateimg_f: function (e) {
    let that = this
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let imgbox = this.data.imgbox3;
    imgbox.splice(index, 1)
    that.setData({
      imgbox3: imgbox,
    });
  },
  // 删除反面上传的图片
  delateimg_r: function (e) {
    let that = this
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let imgbox = this.data.imgbox3;
    imgbox.splice(index, 1)
    that.setData({
      imgbox4: imgbox,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.auth.syncUserInfo()
      .then(res => {
        console.log('获取用户', res)
        if (res.code == 200) {
          that.setData({
            phone: res.data.phone
          })
        }
      })
 
  },
  // 入驻基本资料表单提交
  formSubmitl: function (e) {
    console.log(e)
    let that = this
    let img3 = that.data.imgbox3;
    let img4 = that.data.imgbox4;
    let data = e.detail.value;
    console.log('获取表单数据',data)

    //请求参数
    Tips.loading()
    if (data.name && data.address && data.storename && img3.length != 0 && img4.length != 0) {
      app.auth.doInd(data)
      .then(res=>{
        console.log('注册结果',res)
        return app.auth.sendImg('q', img3)
       
      })
      .then(res => {
          console.log('山川图片', res)
          if(res.statusCode==200){
            return app.auth.sendImg('h', img4)
          }
      })
      .then(res=>{
        Tips.loaded()
        if(res.statusCode==200){
          Tips.toast('注册成功',function(){
            wx.reLaunch({
              url: '/pages/apply/success/success',
            })
          })
        }
      })
      .catch(rej=>{
        Tips.loaded()

        console.log('注册失败',rej)
        Tips.alert('注册失败')
      })
    } else {
      Tips.loaded()

     Tips.alert('请填写完整')
     
    }

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