// index.js
// 获取应用实例
const app = getApp()

var bus = require('../../utils/bus.js').bus

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorage({
      key:"bus",
      data:bus
    })
  },
  /**
   * 逻辑函数--跳转最近站点页面
   */
  onRedirectToNearestStation () {
    wx.navigateTo({
      url: '/pages/navigation/navigation',
    })
  },

  /**
   * 逻辑函数--跳转所有线路页面
   */
  onRedirectToAllLines () {
    wx.navigateTo({
      url: '/pages/allLines/allLines',
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
