// pages/navigation/navigation.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentLocation:{
      name:"天津",
      longitude:117.2,
      latitude:39.13
    },
    locationState:"InLocation",
    isLoading:false,
    markers:[
      {
          longitude: 117.2,
          latitude:39.13
      }
    ],
    isEnableSearch : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    qqmapsdk = new QQMapWX({
      key: '******'
  });
    var tempLocation;
    wx.startLocationUpdate()
    qqmapsdk.reverseGeocoder({
      success (res) {
        var famousArea = res.result.address_reference.landmark_l1 || res.result.address_reference.landmark_l2
        var tempLocation = {
          name:famousArea.title,
          longitude:famousArea.location.lng,
          latitude:famousArea.location.lat
        }
        _this.setData({
          currentLocation:tempLocation,
          markers:[
            {
                longitude: tempLocation.longitude,
                latitude:tempLocation.latitude
            }
        ]
        })
      },
      fail (err) {
        _this.setData({
          locationState:"To location failure"
        })
      },
      complete (res) {
        wx.stopLocationUpdate({
          success: (res) => {
            _this.setData({
              locationState:"Complete"
            })
          },
        })
      }
    })
  },
  /**
   * 业务逻辑函数--点击搜索班车按钮触发
   */
  searchBus () {
    var _this = this
    _this.setData({
      isLoading:true
    })
    var bus = wx.getStorageSync('bus')
    var distancePar = []
    for (const item of bus) {
      var tempLocation = {
        longitude:item.longitude,
        latitude:item.latitude
      }
      distancePar.push(tempLocation);
    }
    qqmapsdk.calculateDistance({
      from:{
        longitude : _this.data.currentLocation.longitude,
        latitude:_this.data.currentLocation.latitude
      },
      to:distancePar,
      success (res) {
        var distance = res.result.elements
        var minLocation = []
        distance.forEach((item, index) => {
          var tempSortMinLocation = {}
          tempSortMinLocation.bus = bus[index]
          tempSortMinLocation.distance = item.distance
          minLocation.push(tempSortMinLocation)
        });
        minLocation.sort((property => {
          return (a,b) => {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
          }
        })('distance'))
        wx.setStorage({
          key:"minLocation",
          data:minLocation
        })
        _this.setData({
          isLoading:false
        })
        wx.navigateTo({
          url: '/pages/busResult/busResult',
        })
      },
      fail (err) {
        _this.setData({
          locationState:"Route query failure"
        })
      }
    })
  },
  /**
   * 业务逻辑函数--选择其他位置
   */
  chooseOtherLocation () {
    var _this = this
    wx.chooseLocation({
      longitude: this.data.currentLocation.longitude,
      latitude: this.data.currentLocation.latitude,
      success (res) {
        _this.setData({
          currentLocation:{
            name:res.name,
            longitude:res.longitude,
            latitude:res.latitude,
          },
          markers:[
            {
                longitude: res.longitude,
                latitude:res.latitude
            }
          ],
          locationState:"Complete"
        })
      },
      fail (err) {
        _this.setData({
          locationState:"To location failure"
        })
      }
    })
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
    this.setData({
      isEnableSearch : false
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

  }
})