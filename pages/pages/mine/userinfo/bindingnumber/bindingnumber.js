// pages/mine/userinfo/bindingnumber/bindingnumber.js
var app = getApp()
import Tips from '../../../../class/utils/Tips.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    getText: '获取验证码', //倒计时
    getChange: true,    //是否可以点击发送验证码
    yanzheng: '', //验证码
    phone: '',     //手机号
    mallPhone:'', //是否从店铺那边过来
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let mallPhone = options.mallPhone||'no'
    console.log('获取mallPhone',mallPhone)
    this.setData({
      mallPhone:mallPhone
    })
  },
  // 手机号码
  blurPhonel: function (e) {
    let that = this
    var phone = e.detail.value;
      console.log('手机号', phone)
      that.setData({
        ajxtrue: true,
        phone: phone
      })
  },

  //获取验证码
  yanzhengBtn: function () {
    var getChange = this.data.getChange
    var n = 59;
    var that = this;
    var phone = this.data.phone;
    Tips.loading()
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      Tips.loaded()

      Tips.alert('手机号有误')
    } else {
      if (getChange) {
        this.setData({
          getChange: false
        })
        var time = setInterval(function () {
          var str = '(' + n + ')' + '重新获取'
          that.setData({
            getText: str
          })
          if (n <= 0) {
            that.setData({
              getChange: true,
              getText: '重新获取'
            })
            clearInterval(time);
          }
          n--;
        }, 1000);
        app.auth.getIndCode(phone)
        .then(res=>{
          Tips.loaded()
          console.log('获取验证码',res)
          if(res.code==200){
            Tips.toast('发送成功')
          }
        })
      
      }
    }
  },
 
  //第一步骤
  formSubmitl: function (e) {
    Tips.loading()
    let that = this
    var phone = e.detail.value.phone;
    var nchange = e.detail.value.nchange;
    let mallPhone=that.data.mallPhone;
    console.log(phone, nchange)
    if(phone&&nchange){
      app.auth.doDalidate(phone,nchange)
      .then(res=>{
        if(res.code==200){
          return app.auth.doBindPhone(phone)
        }
      })
      .then(res=>{
        Tips.loaded()

        if(res.code==200){
          Tips.toast('绑定成功',function(){
            if(mallPhone=='yes'){
              wx.redirectTo({
                url: '/pages/apply/verification/verification',
              })
            }else{
              wx.navigateBack({
                delta: 1
              })
            }
           
          })
        }
      })
      .catch(rej=>{
        Tips.loaded()
        Tips.alert('验证码有误')
      })
    }else{
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

  }
})