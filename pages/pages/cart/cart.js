// pages/cart/cart.js
var app = getApp();
import Tips from '../../class/methods/Tips.js'
// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasList: 1, //没有东西时候显示空白
    carts: [], //购物车信息
    total:'', //总价
    selectedAllStatus: '', // 实现bindSelectAll事件，改变全选状态

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.mall.doPay()
    // .then(res=>{
    //   console.log('resssssss',res)
    // })
  },
  bindMinus: function (e) {
    let that=this
    let mid=e.currentTarget.dataset.mid;
    var gid = e.currentTarget.dataset.index;
    let cid=e.currentTarget.dataset.cid;
    var num = this.data.carts[mid].goods[gid].num;  //商品数量
    console.log('点击减',num)
      num--;
    // 购物车数据
    var carts = this.data.carts;
    carts[mid].goods[gid].num = num;
    // 按钮可用状态
    
    //d掉接口购物车减
    Tips.loading()
    app.index.doCartNum(cid,'JN')
    .then(res=>{
      Tips.loaded()
      console.log('减结果',res)
      that.setData({
        carts: carts,
      });
      that.sum();
    })
  },
  bindPlus: function (e) {
    let that = this
    let mid = e.currentTarget.dataset.mid;
    var gid = e.currentTarget.dataset.index;
    let cid = e.currentTarget.dataset.cid;
    var num = this.data.carts[mid].goods[gid].num;  //商品数量
    // 自增
    num++;
  
    var carts = this.data.carts;
    carts[mid].goods[gid].num = num;
    //d掉接口购物车减
    Tips.loading()
    app.index.doCartNum(cid, 'JA')
      .then(res => {
        Tips.loaded()
        console.log('加结果', res)
        that.setData({
          carts: carts,
        });
        this.sum();
      
      })
  
  },
  // -----------------------------------------------------------------------------------------
  // 单击复选框是否选中-------店铺是否被选
  MCheckbox: function (e) {
    // console.log('选择框', e)
    var index = e.currentTarget.dataset.index;
    let sid=e.currentTarget.dataset.sid
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    console.log('是否被选中', selected)
    let select_status = (!selected) ? '1' : '0';
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    carts[index].goods.forEach(function(e){
        // console.log('每个商品',e)
      e.selected = carts[index].selected
    })
    if (carts.every(this.allSel)) {
      this.setData({
        selectedAllStatus: true,
      })
    } else {
      this.setData({
        selectedAllStatus: false,
      })
    }
    // 写回经点击修改后的数组
    //掉接口
    Tips.loading()
    app.index.doSel(sid,'', 's', select_status)
      .then(res => {
        Tips.loaded()
        console.log('结果', res)
        this.setData({
          carts: carts
        });
      })
    this.sum();
  },
  //-------------------------商品选中
  GCheckbox: function (e) {
    // console.log('选择框', e)
    var gid = e.currentTarget.dataset.index;
    let mid=e.currentTarget.dataset.mid;
    let cid=e.currentTarget.dataset.cid
    console.log('湖区id',mid,gid)
    //原始的icon状态
    var selected = this.data.carts[mid].goods[gid].selected;
    // console.log('是否被选中', selected)
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[mid].goods[gid].selected = !selected;
    let select_status=(!selected)?'1':'0';
    console.log('状态', select_status)
   
    if (carts[mid].goods.every(this.allSel)) {
     
      carts[mid].selected=true
      if(carts.every(this.allSel)){
        this.setData({
                selectedAllStatus: true,
              })
      }else{
      this.setData({
              selectedAllStatus: false,
            })
      }
    } else {
      carts[mid].selected = false
      if (carts.every(this.allSel)) {
        this.setData({
          selectedAllStatus: false,
        })
      } else {
        this.setData({
          selectedAllStatus: false,
        })
      }
    }
  //掉接口
  Tips.loading()
    app.index.doSel('', cid, 'c', select_status)
    .then(res=>{
      Tips.loaded()
      console.log('结果',res)
      this.setData({
        carts: carts
      });
    })
    this.sum();
  },
  //判断是否全选
  allSel(e) {
    // console.log('判断是否全选', e)
    return e.selected
  },
  // ---------------
  // 全选复选框是否选中
  bindSelectAll: function () {
    let that=this
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作
    selectedAllStatus = !selectedAllStatus;
    let select_status = selectedAllStatus ? '1' : '0';
    // 购物车数据，关键是处理selected值
    var carts = this.data.carts;
    // 遍历
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
      carts[i].goods.forEach(function (e) {
        // console.log('每个商品', e)
        e.selected = carts[i].selected
      })
    }
    //掉接口
    Tips.loading()
    app.index.doSel('', '', 'q', select_status)
      .then(res => {
        Tips.loaded()
        console.log('结果', res)
        this.setData({
          selectedAllStatus: selectedAllStatus,
          carts: carts
        });
        that.sum();

      })

   
  },
  // -----------------------------------------------------------------------------------------
  //  计算总的金额
  sum: function () {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (let i = 0; i < carts.length; i++) {
      let goods=carts[i].goods
      for (let  j = 0; j <goods.length ;j++){
        let selected = goods[j].selected
        if (selected) {
           total += goods[j].num * goods[j].sell_price;
          }
       }
    }
    total = total.toFixed(2);
    console.log('ttttttttt', total)

    // 写回经点击修改后的数组
    this.setData({
      total: total
    });
  },
  // ------------------------------------------------------------------
  // 回tabar中的首页
  tobackHome: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // -----------------------------------------------------------

  orderInto: function () {
    let that = this;
    let total=that.data.total
    if(total!=0){
         wx.navigateTo({
        url: "/pages/cart/orderdetail/orderdetail"
      })
    }else{
      Tips.alert('请选择商品')
    }
    // let total = this.data.total;
    // let sel = [];
    // for (var i = 0; i < carts.length; i++) {
    //   // selectedTotal += carts[i].selected;
    //   if (carts[i].selected) {
    //     sel.push(carts[i])
    //   }
    // }
    // carts = sel
    // if (carts.length > 0) {
      // wx.navigateTo({
      //   url: "/pages/cart/orderdetail/orderdetail"
      // })
    // } else {
    //   wx.showToast({
    //     title: '请选择要结算的商品',
    //     icon: 'success',
    //     duration: 2000
    //   })
    // }

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
    let that = this
    Tips.loading()
    app.index.getCart()
    .then(res=>{
      Tips.loaded()
      console.log('列表',res)
      let carts=res.data;
      if (carts.every(this.allSel)) {
        that.setData({
          selectedAllStatus: true,
        })
      } else {
        that.setData({
          selectedAllStatus: false,
        })
      }

      that.setData({
        carts:carts
      })

      that.sum()
    })
    .catch(rej=>{
      Tips.loaded()

      that.setData({
        carts:[]
      })
    })
  
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

  },
  
  // //  购物车删除
  deleteList(e) {
    var that = this
    // const index = e.currentTarget.dataset.index;
    let cid = e.currentTarget.dataset.cid;

    Tips.loading()
    app.index.delCart(cid)
    .then(res =>app.index.getCart())
      .then(res => {
        Tips.loaded()
        console.log('列表', res)
        that.setData({
          carts: res.data
        })
        that.sum();
        
      })
      .catch(rej => {
        Tips.loaded()

        that.setData({
          carts: []
        })
      })

  },
})