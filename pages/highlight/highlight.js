//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    storageContent:1111,
    storageSyncContent: 22222,
    stname: '',
    syncstname:''
  },
  getdata:function(name){
    console.log(this.data[name])
  },
  /**
    * 异步存储
    */
  listenerStorageSave: function (e) {
    console.log(e.detail.value)
    var that =this;
    //以键值对的形式存储 传进去的是个对象
    wx.setStorage({
      key: 'key',
      data: e.detail.value,
      success: function (res) {
        console.log(res)
        that.listenerStorageGet()
      }
    })
  },
  /**
   * 异步取信息
   */
  listenerStorageGet: function () {
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'key',
      success: function (res) {
        console.log(res)
        that.setData({
          //
          storageContent: res.data
        })
      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 清除数据
   */
  listenerStorageClear: function () {
    var that = this;
    wx.clearStorage({
      success: function (res) {
        that.setData({
          storageContent: ''
        })
      }
    })
  },


  /**
   * 数据同步存储
   */
  listenerStorageSyncSave: function () {
    wx.setStorageSync('key', '我是同步存储的数据')
  },

  /**
   * 数据同步获取
   */
  listenerStorageSyncGet: function () {
    // var that = this;
    var value = wx.getStorageSync('key')
    this.setData({
      storageSyncContent: value
    })
  },

  /**
   * 清除同步存储数据
   */
  listenerStorageSyncClear: function () {
    wx.clearStorageSync()
  },
  globalData: {
    userInfo: null
  }
  
})
