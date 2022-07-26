/**
 *
 * @param {Blob} blob  图片的二进制对象
 * @param {Number} qualityScale 图片质量压缩比例 0.1 - 1 之间的值
 * @param {Number} siziScale 图片尺寸压缩比例 0.1 - 1 之间值
 * @return { Promise } 返回一个Promise对象
 */
function compressImage(blob, qualityScale, siziScale) {
  if (!(blob instanceof Blob)) {
    throw TypeError('first arg: blob is not a Blob object')
  }
  if (!/image\/.*/.test(blob.type)) {
    throw TypeError('first arg: blob is not a binary object of image file')
  }
  if (!(qualityScale <= 1 && qualityScale >= 0.1)) {
    throw RangeError('secend arg: qualityScale assign with value is not avaliable, only allowed value are between 0.1 and 1')
  }
  if (siziScale && !(siziScale <= 1 && siziScale >= 0.1)) {
    throw RangeError('third arg: siziScale assign with value is not avaliable, only allowed value are between 0.1 and 1')
  }
  const url = URL.createObjectURL(blob);
  const img = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  return new Promise(function (resolve, reject) {
    var timer = window.setTimeout(function () {
      URL.revokeObjectURL(url);
      reject('image loading failed via blob')
    }, 10000)
    img.onload = function (ev) {
      const target = ev.target;
      if (siziScale) {
        width = this.width * siziScale;
        height = this.height * siziScale;
      } else {
        width = this.width;
        height = this.height;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(this, 0, 0, width, height);
      canvas.toBlob(function (blob) {
        resolve(blob);
        URL.revokeObjectURL(url);
        clearTimeout(timer)
      }, 'image/jpeg', qualityScale);
    }
    img.src = url;
  })
}
