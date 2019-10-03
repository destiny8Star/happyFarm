var QQMapWX = require('../../qqmap-wx-jssdk.js');
import modals from '../base/modal.js'
var qqmapsdk = new QQMapWX({
  key: '2KDBZ-QW4WJ-BU4FA-KIJQR-IA4E5-KMFU5'
});
const app = getApp()
const getCity = function () {
  var promise = new Promise(function (resolve, reject) {
    var that = this
    wx.getLocation({
      success: function (res) {
        var latitude1 = res.latitude
        var longitude1 = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude1,
            longitude: longitude1
          },
          success: function (res) {
            var add = res.result.address_component.city
            let index = add.indexOf('市')
            let currentCity = add.substring(0, index)
            wx.setStorageSync('city', currentCity)
          },
          complete: function (res) {
          }
        })
      },
      fail: function (res) {
        let url = "/pages/index/chooseCity/chooseCity"
        modals.navigate(url)
      }
    })
  });
  return promise;
};

module.exports.getCity = getCity 