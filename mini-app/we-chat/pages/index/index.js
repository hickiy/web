Page({
  data: {},
  onShow() {
    wx.getUserInfo({
      success(res) {
        console.log(res);
      }
    })
  },
  bindtap() {
    wx.chooseMessageFile({
      count: 100,
      success: (res) => {
        console.log(res);
        this.uploadFile(res.tempFiles[0]);
      }
    })
  },
  uploadFile(file) {
    wx.uploadFile({
      filePath: file.path,
      name: file.name,
      url: 'http://localhost:49000/file/upload',
      success(res) {
        console.log(res);
      }
    })
  }
})