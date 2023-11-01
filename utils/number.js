/**
 * 字符串截断
 * @param {String | Number} str 字符串
 * @param {Object} [opt] 配置项
 * @param {Number} opt.startNum 开始截取的长度
 * @param {String} opt.separator 中间的分隔符
 * @param {Number} opt.endNum 结尾截取的长度
 * @returns {String} 截断后的字符串
 */
export const strTruncate = (str, opt = {}) => {
  if (Object.prototype.toString.call(opt) !== '[object Object]') throw new Error('opt must be an object');
  const { startNum = 3, separator = '***', endNum = 4 } = opt;
  if (str == null) return '';
  const len = str.length;
  if (len <= startNum + endNum) return str;
  return str.substring(0, startNum) + separator + str.substring(len - endNum);
};

/**
 * @description: 格式化数字为三位分节法
 * @param {Number} num // 数字
 * @param {Number} precision // 精度
 * @param {Object} [opt] // 配置项
 * @param {String} opt.separator // 分隔符
 * @param {Number} opt.decimalSeparator // 数字分割位数
 * @param {Number} opt.exponent // 指数
 * @param {Number} opt.base // 指数基数
 * @returns {String} // 格式化后的数字
 */
export const numFormat = (num, precision = 0, opt = {}) => {
  if (Object.prototype.toString.call(precision) !== '[object Number]') throw new Error('precision must be a number');
  if (Object.prototype.toString.call(opt) !== '[object Object]') throw new Error('opt must be an object');
  const { separator = ',', decimalSeparator = 3, exponent = 0, base = 10 } = opt;
  // 检查是否为数字
  if (/^\d+(\.\d+)?$/.test(num)) {
    num = Number(num);
    // 指数
    if (exponent != 0) {
      num = num / Math.pow(base, exponent);
    }
    // 保留小数点后几位
    if (precision > 0) {
      const factor = Math.pow(10, precision);
      const tempNumber = num * factor;
      const roundedTempNumber = Math.round(tempNumber);
      num = roundedTempNumber / factor;
    }
    // 分节法
    const numArr = num.toString().split('.');
    const reg = new RegExp(`(\\d+?)(?=(?:\\d{${decimalSeparator}})+$)`, 'g');
    numArr[0] = numArr[0].replace(reg, `$1${separator}`);
    return numArr.join('.');
  } else {
    return num;
  }
};
