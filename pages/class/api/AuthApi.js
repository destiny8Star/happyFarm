import BaseApi from './BaseApi.js';
import Tips from '../utils/Tips.js';
const wxApi = require('./../utils/WxApi.js');
// const wxApi = require('./../utils/WxApi.js');
export default class AuthApi extends BaseApi {
  constructor() {
    super();
  }

  getCode() {
    return wxApi.wxLogin().then(res => {
      if (res.code == null || res.code == '') {
        return Promise.reject('登录失败');
      } else {
        return res.code;
      }
    });
  }
  //获取openid
  login(code) {
    return this.get('wxOpenid', {
      'js_code': code
    });
  }

  //微信授权
  sendInfo(auth, userIfo) {
    // console.log(auth,userIfo)
    return this.post('wxLogin', {
      'nickname': userIfo.nickName,
      'openid': auth.openid.openid,
      'avatar': userIfo.avatarUrl,
      'token': auth.token
    })

  }
  saveAuthInfo(auth) {
    // console.log('auto', auth);
    let data = auth.data
    wx.setStorageSync('auth', data);
    return auth.data;
  }
  //保存获取用户信息
  syncUserInfo() {
    // let token=wx.getStorageSync('auth').token
    // let resl = {
    //   'openid': res.data.openid,
    //   "token":token
    // };
    return this.get('userInfo').then(res => {
      wx.setStorageSync('user', res.data)
      return res
    })
  }
  //获取验证码
  getIndCode(phone) {
    return this.post('sendNote', {
      phone: phone
    })
  }
  //验证验证码
  doDalidate(phone, code) {
    return this.post('verifyNote', {
      phone: phone,
      code: code
    })
  }
  //绑定手机好
  doBindPhone(phone) {
    return this.post('bindPhone', {
      phone: phone
    })
  }
  //店铺申请协议
  getMAgree(){
    return this.get('applyDeal')
  }
//d店铺申请图片
getMImage(){
  return this.get('applyImage')
}
  //实名认证
  doInd(data) {
    return this.post('storeApply', {
      phone: data.phone,
      username: data.name,
      store_name: data.storename,
      pattern: data.branch,
      city: data.county,
      address: data.address
    })
  }
  //实名认证上传图片
  sendImg(type,arr) {
    let auth = wx.getStorageSync('auth');
   let token = auth.token;
    let openid = auth.openid.openid
    return new Promise((resole,rej)=>{
      wx.uploadFile({
        url:  'https://farm.isoft.mobi/api/papersUpload',
        filePath: arr[0],
        name: 'files',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        formData: {
          file_type:type,
          token: token,
          openid:openid
        },
        success:function(res){
            resole(res)
        },
        fail:function(res){
               rej(res)
        }
      })
    })
  }


}