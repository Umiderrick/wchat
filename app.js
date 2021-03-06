//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("im king")
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  /**
   * 异步存储
   */
  listenerStorageSave: function () {
    //以键值对的形式存储 传进去的是个对象
    wx.setStorage({
      key: 'key',
      data: '我是storeage异步存储的信息',
      success: function (res) {
        console.log(res)
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
