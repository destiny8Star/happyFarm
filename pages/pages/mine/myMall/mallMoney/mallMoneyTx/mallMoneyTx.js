// pages/mine/myMall/mallMoney/mallMoneyTx/mallMoneyTx.js
const app=getApp()
import Tips from '../../../../../class/methods/Tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txmoney:'', //全部提现
    ktxmoney:'100',  //可提现金额
    okBtn:false,    //提现按钮是否可以点击
    helpBox:false,  //弹出框
  },
  //看输入的值
  inpVal(e){
    let that=this
      let value=e.detail.value;
      console.log('value',value)
      if(value<=0){
         that.setData({
           okBtn: false, 
         })
      }else{
        that.setData({
          okBtn: true,
        })
      }
  },
  //全部提现
  allmoney(){
    let ktxmoney=this.data.ktxmoney;
    if(ktxmoney>0){
      this.setData({
        okBtn: true,
      })
    }
   this.setData({
     txmoney:ktxmoney
   })
  },
  //弹框
  helpBox(){
      this.setData({
        helpBox:true
      })
  },
  hideMask(){
    this.setData({
      helpBox: false
    })
  },
  //提现
  tx(e){
    let money=e.detail.value.tmoney
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this

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
      let that=this
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