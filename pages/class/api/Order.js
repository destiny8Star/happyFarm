import BaseApi from './BaseApi.js';
export default class Order extends BaseApi{
   constructor(){
     super()
   }
//获全部订单
getAllOrder(page){
  return this.get('orderAll',{
   page:page,
   size:10
  })
}
//根据订单状态查询订单
getStaOrder(page,status){
  return this.get('orderAllByStatus',{
    page:page,
    size:10,
    order_status: status
  })

}
//订单详情 
  getOrdDetail(order_sn){
    return this.get('orderDetail',{
      order_sn: order_sn
    })
  }
//订单商品列表
  getOrderGoods(order_sn){
    return this.get('orderGoods',{
      order_sn: order_sn
    })
  }
//删除订单
delOrder(ord){
  return this.post('closeOrder',{
    order_sn:ord
  })
}
//确认订单
confirmOrder(ord){
  return this.post('finishOrder',{
    order_sn:ord
  })
}
//申请退款呢绒
sendPullContent(ord,content){
  return this.post('refundOrder',{
    order_sn: ord,
    cause:content
  })
}

  //退款申请图片
  pullSendImg(rid, img) {
    let auth = wx.getStorageSync('auth');
    let token = auth.token;
    let openid = auth.openid.openid
    return new Promise((resole, rej) => {
      wx.uploadFile({
        url: 'https://farm.isoft.mobi/api/refundUpload',
        filePath: img,
        name: 'files',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        formData: {
          refund_id: rid,
          token: token,
          openid: openid
        },
        success: function (res) {
          resole(res)
        },
        fail: function (res) {
          rej(res)
        }
      })
    })
  }

  //物流查询
  getTrans(ord){
    return this.get('expressQuery',{
      order_sn:ord
    })
  }
  //物流及时查询
  getTransTime(ord) {
    return this.get('express', {
      express_no: ord
    })
  }
//自定义查询店铺订单
searchCustom(start,end){
  return this.get('storeOrderByDate',{
    start_date:start,
    end_date:end
  })
}
}