// pages/mine/wuliu/wuliuDetail/wuliuDetail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:'', //详细信息
    img:'', //快递图片
    name:'', //快递名称
    num:'', //快递单号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
   let num=options.num;
   let img=options.img
   let name=options.name
   that.setData({
     img:img,
     name:name,
     num:num
   })
    app.order.getTransTime(num)
    .then(res=>{
      console.log('获取嘻嘻',res)
      that.setData({
         detail:res.data
      })
    })
    .catch(rej=>{
      console.log('火球信息',rej)
      if(rej.Success){
        that.setData({
          detail: rej.Traces
        })
      }
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