Page({
  data: {},
  onShow() {
    wx.getUserInfo({
      success(res) {
        console.log(res);
      }
    })
  }
})