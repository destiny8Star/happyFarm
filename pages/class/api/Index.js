import BaseApi from './BaseApi.js';
export default class Index extends BaseApi{
  constructor(){
    super()
  };

  //获取轮播图
  getBanner(){
    return this.get('banner')
  }

//获取商品类型
getGoodType(){
  return this.get('goodsClass')
}


//获取商品列表
getGoods(page,class_id){
  return this.get('goodsList',{
    page:page,
    size:10,
    class_id:class_id
  })
}

//商品详情
  getGoodDetail(goods_id){
  return this.get('goodsDetail',{
    goods_id:goods_id
  })
}
//热门搜索
getHotSearch(){
  return this.get('hotSearch')
}
  //历史搜索
  getHisSearch() {
    return this.get('recentlySearch')
  }
  //搜索商品
  getSGList(page,value){
    return this.get('goodsSearch',{
      page:page,
      value:value,
      size:10
    })
  }

  //加入购物车
  joinCart(store_id,goods_id){
    return this.get('joinShopCart',{
      store_id:store_id,
      goods_id:goods_id
    })
  }
  //获取购物车列表
  getCart(){
    return this.get('shopCartList')
  }
  //购物车是否选中
  doSel(sid, cid, selT, selSta){
    return this.post('shopCartSelected',{
      store_id:sid,
      cart_id:cid,
      select_type:selT,
      select_status:selSta
    })
  }
  //购物车加减
  doCartNum(cid,change){
    return this.post('shopCartUpdateNum',{
       cart_id:cid,
       join_type:change
    })
  }
  //删除购物车
  delCart(cid){
    return this.get('shopCartDelete',{
      cart_id:cid
    })
  }
  //去结算
  doAccount(){
    return this.get('shopCartJieSuan')
  }
//运费
getFreight(province){
  return this.get('shopCartFreight',{
    province:province
  })
}
//购物车结算商品 
getCartGoods(){
  return this.get('shopCartGoodsList')
}

}