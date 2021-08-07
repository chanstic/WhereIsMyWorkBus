// pages/allLines/allLines.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dropDownMenuTitle:['选择班车线路'],
        busLines: [],
        bus:[],
        tempBus:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var bus = wx.getStorageSync('bus')
        this.setData({
            bus:bus
        })
        this.addNavItem()
    },
    /**
     * 逻辑函数--选择导航栏项目触发
     */
    selectedItem: function(e) {
        var chooseBus = []
        if (e.detail.selectedTitle == "全部") {
            this.data.bus.forEach(item => {
                if (item.line == e.detail.selectedId) {
                    chooseBus.push(item)
                }
            })
            this.setData({
                tempBus:chooseBus
            })
            chooseBus = []
        } else {
            this.data.bus.forEach(item => {
                if (item.title == e.detail.selectedTitle) {
                    chooseBus.push(item)
                }
                this.setData({
                    tempBus:chooseBus
                })
            })
            chooseBus = []
        }
    },
    /**
     * 逻辑函数--添加导航栏选择项
     */
    addNavItem () {
        var tempBusLines = []
        var tempChildModel = []
        for (let index = 1; index <= 35; index++) {
            var tempChildModel = []
            tempChildModel.push({
                id:`${index}`,
                title:"全部"
            })
            this.data.bus.forEach(item => {
                if (item.line == index) {
                    tempChildModel.push({
                        id:`${item.line}`,
                        title:`${item.title}`
                    })
                }
            })
            var temp = {
                id: index,
                title:`${index}号车`,
                childModel:tempChildModel
            }
            tempBusLines.push(temp)
            temp = {}
            tempChildModel = []
        }
        this.setData({
            busLines:tempBusLines
        })
        tempBusLines = []
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