import BaseApi from './BaseApi.js';
export default class Game extends BaseApi{
  constructor(){
    super()
  };

  //我的农场信息判断是否该领取种子
  judgeSeed(){
    return this.get('userFarm')
  }

  //签到
  doSign(){
    return this.post('todaySign')
  }

  //种子列表
  getSeed(){
    return this.get('seed')
  }
  //领取种子
  haveSeed(id){
    return this.post('plant',{
      seed_id:id
    })
  }
  //浇水喂食
  dogrow(oid){
    return this.post('farmFeed',{
      object_openid:oid
    })
  }
  //给好友浇水喂食
  dogrowF(userInfo) {
    return this.post('farmFeed', {
      object_openid: userInfo.openid.openid,
    })
  }
  //最近好友主力
  getFriend(){
    return this.get('farmHelp')
  }

  //收割
  doReap(id,name,phone,address){
    return this.post('farmReap',{
      id:id,
      username:name,
      phone:phone,
      address:address
    })
  }
  //公告
  getNotice(){
    return this.get('notice')
  }
}