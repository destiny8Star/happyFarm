// pages/mine/refund/refund.js
const app=getApp()
import Tips from '../../../class/methods/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: '',//上传图片
    allInfo:'', //订单信息
    ord: '' ,//订单号
  },


  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 上传图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var picid = e.currentTarget.dataset.pic;
    var that = this;
    var n = 3;
    if (3> imgbox.length > 0) {
      n = 3 - imgbox.length;
    } else if (imgbox.length == 3) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (3 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);

        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        that.setData({
          imgbox: imgbox
        });
      }
    })
  },
  //申请退款
  formSubmit(e){
    let that=this
    let ord=that.data.ord
     let content=e.detail.value.content
    let imgbox = that.data.imgbox;
     console.log('eee',e)
     if(content){
       Tips.loading()
       app.order.sendPullContent(ord, content)
         .then(res => {
           Tips.loaded()
           if (imgbox.length!=0){
             for(let i=0;i<imgbox.length;i++){
               Tips.loading()
               app.order.pullSendImg(res.data.refund_id,imgbox[i])
                .then(res=>{
                  Tips.loaded()
                  Tips.toast('提交成功',function(){
                    console.log('提交次数')
                    wx.navigateBack({
                      delta: 1
                    })
                  })
                  console.log('shang穿结果',res)
                })
             }
           }else{
             Tips.toast('提交成功',function(){
               wx.navigateBack({
                 delta:1
               })
             })
           }
           console.log('结果', res)
         })
     }else{
       Tips.alert('请填写内容')
     }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var that = this;
    let ord = opt.ord
    Tips.loading()
    that.setData({
      ord: ord
    })
    app.order.getOrdDetail(ord)
      .then(res => {
        Tips.loaded()
        console.log('订单详情', res)
        that.setData({
          allInfo: res.data
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