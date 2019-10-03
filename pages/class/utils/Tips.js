export default class Tips {
  constructor() {
    this.isLoading = false;
  }
 static toast(title, onHide, icon = 'success') {
    wx.showToast({
      title: title,
      icon: icon,
      mask: true,
      duration: 1000
    });
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 1000)
    }
  }

   static alert(title) {
    wx.showToast({
      title: title,
      image: '/imgs/img/alert.png',
      mask: true,
      duration: 1000
    })
  }

  static error(title, onHide) {
    wx.showToast({
      title: title,
      image: '/img/img/error.png',
      mask: true,
      duration: 1000
    });
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 3000);
    }
  }

  static loading(title = '加载中') {
    if (Tips.isLoading) {
      return;
    }
    Tips.isLoading = true;
    wx.showLoading({
      title: title,
      mask: true
    });
  }

  static loaded() {
    if (Tips.isLoading) {
      Tips.isLoading = false;
      wx.hideLoading();
    }
  }

  static share(title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function (res) {
        Tips.toast('分享成功');
      }
    }
  }

  static action(items) {
    return new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: items,
        success: function (res) {
          const result = {
            index: res.tapIndex,
            text: items[res.tapIndex]
          }
          resolve(result);
        },
        fail: function (res) {
          reject(res.errMsg)
        }
      })
    });
  }

  static actionWithFunc(items, ...functions) {
    wx.showActionSheet({
      itemList: items,
      success: function (res) {
        const index = res.tapIndex;
        if (index >= 0 && index < functions.length) {
          functions[index]();
        }
      }
    })
  }

  /**
     * 弹出确认窗口
     */
  static confirm(text, payload = {}, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve(payload);
          } else if (res.cancel) {
            reject(payload);
          }
        },
        fail: res => {
          reject(payload);
        }
      })
    });
  }
  /**
    * 弹出确认窗口
    */
  static modal(text, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: false,
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res);
        }
      })
    })
  }
}

Tips.isLoading = false;