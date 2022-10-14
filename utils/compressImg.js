/**
 *
 * @param {Blob} blob 图片的二进制对象
 * @param {Number} qualityScale 图片质量压缩比例 0.1 - 1 之间的值
 * @param {Number} [siziScale] 可选参数，图片尺寸压缩比例 0.1 - 1 之间值
 * @param {Number} [minWitdh] 可选参数，图片最小宽度，图片宽度小于minWitdh则不进行尺寸压缩
 * @return { Promise } 返回一个Promise对象
 */
 export default function compressImage(blob, qualityScale, siziScale, minWitdh) {
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
  if (typeof minWitdh != 'number') {
    throw TypeError('fourth arg: minWitdh is not a number, allowed type of number only')
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
      if (siziScale && (!minWitdh || this.width * siziScale > minWitdh)) {
        width = this.width * siziScale;
        height = this.height * siziScale;
      } else {
        width = this.width;
        height = this.height;
      }
      canvas.width = width.toFixed(0);
      canvas.height = height.toFixed(0);
      const msg = `${blob.name} compression result: origin size: ${this.width} * ${this.height}、 new size: ${canvas.width} * ${canvas.height}，`
      ctx.drawImage(this, 0, 0, width, height);
      canvas.toBlob(function (fileBlob) {
        console.info(`${msg} origin quality: ${(blob.size / 1024 / 1024).toFixed(2)}MB、 new quality: ${(fileBlob.size / 1024 / 1024).toFixed(2)}MB。`)
        resolve(fileBlob);
        URL.revokeObjectURL(url);
        clearTimeout(timer)
      }, 'image/jpeg', qualityScale);
    }
    img.src = url;
  })
}
