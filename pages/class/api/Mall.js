import BaseApi from './BaseApi.js'
export default class Mall extends BaseApi {
  constructor() {
    super()
  };
  
  //获取商店信息
  getMallInfo(){
    return this.get('storeInfo')
  }
//修改店铺简介
changShore(store_id,introduce){
  return this.post('storeSignUpdate',{
    store_id:store_id,
    introduce: introduce
  })
}

//获取店铺列表
getMallList(page){
  return this.get('storeStreet',{
    page:page,
    size:10
  })
}
//获取店铺详情
getMallDeail(sid){
  return this.get('storeDetail',{
    store_id:sid
  })
}

//店铺商品列表
getMGs(sid,page){
  return this.get('storePage',{
    store_id:sid,
    page:page,
    size:10
  })
}
  getMGs2(sid) {
    return this.get('storePage', {
      store_id: sid,
      page: 1,
      size: 5
    })
  }
//商品代理
doagent(gid,sprice){
  return this.post('goodsAgency',{
    goods_id:gid,
    sell_price:sprice
  })
}
//生成订单
  getOrder(name,phone,address,province){
  return this.post('orderAdd',{
    username:name,
    phone:phone,
    address:address,
    province:province
  })
}
//支付
  doPay(total_fee, out_trade_no){
  return this.post('pay',{
    total_fee: total_fee,
    out_trade_no:out_trade_no
  })
}
//w 的商品库
getMallStore(page){
  return this.get('storeGoodsList',{
    page:page,
    size:10
  })
}
//w 我的累计收益
getIncome(){
  return this.get('storeTotal')
}
//账号记录
getRecord(page){
  return this.get('accountRecords',{
    page:page,
    size:10
  })
}
//账号明细
getRecordDet(id){
  return this.get('accountDetail',{
    id:id
  })
}
//店铺价格修改
doChangePrice(gid,price){
  return this.post('goodsUpdatePrice',{
    goods_id:gid,
    price:price
  })
}
//d商品上下架
doUp(gid){
  return this.post('goodsSoX',{
    goods_id:gid
  })
}
  //商店获全部订单
  getAllOrder(page) {
    return this.get('storeOrderAll', {
      page: page,
      size: 10
    })
  }
  //商店根据订单状态查询订单
  getStaOrder(page, status) {
    return this.get('storeOrderAll', {
      page: page,
      size: 10,
      order_status: status
    })
  }
//店铺订单详情
getSODetail(ordnum){
  return this.get('storeOrderDetail',{
    order_sn: ordnum
  })
}
//店铺订单商品
  getSDgoods(order_sn, store_order_sn){
    return this.get('storeOrderGoods',{
      order_sn: order_sn,
      store_order_sn: store_order_sn
    })
}
//店铺带收益和累计收益
getWillIncome(){
  return this.get('storeOrderProfit')
}


}