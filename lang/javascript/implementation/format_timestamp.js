// 时间常量定义
const TIME_CONSTANTS = {
  MILLISECONDS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  DAYS_PER_YEAR: 365,
  DAYS_PER_LEAP_YEAR: 366,
  UNIX_EPOCH_YEAR: 1970
};

// 月份天数数组 [平年, 闰年]
const DAYS_IN_MONTH = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // 平年
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]  // 闰年
];

/**
 * 判断是否为闰年（公历/格里高利历规则）
 * 公历闰年规则：
 * 1. 能被4整除的年份是闰年
 * 2. 但是能被100整除的年份不是闰年（世纪年）
 * 3. 但是能被400整除的年份又是闰年（世纪闰年）
 * 例如：1900年不是闰年，2000年是闰年，2004年是闰年
 * @param {number} year 年份
 * @returns {boolean} 是否为闰年
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * 获取指定年份的总天数
 * @param {number} year 年份
 * @returns {number} 年份天数
 */
function getDaysInYear(year) {
  return isLeapYear(year) ? TIME_CONSTANTS.DAYS_PER_LEAP_YEAR : TIME_CONSTANTS.DAYS_PER_YEAR;
}

/**
 * 数字补零格式化
 * @param {number} num 数字
 * @param {number} length 目标长度
 * @returns {string} 补零后的字符串
 */
function padZero(num, length = 2) {
  return num.toString().padStart(length, '0');
}

/**
 * 将时间戳转换为时间对象
 * @param {number} timestamp 时间戳（毫秒）
 * @returns {Object} 包含年月日时分秒的对象
 */
function parseTimestamp(timestamp) {
  // 转换为秒
  let totalSeconds = Math.floor(timestamp / TIME_CONSTANTS.MILLISECONDS_PER_SECOND);

  // 提取秒
  const seconds = totalSeconds % TIME_CONSTANTS.SECONDS_PER_MINUTE;
  totalSeconds = Math.floor(totalSeconds / TIME_CONSTANTS.SECONDS_PER_MINUTE);

  // 提取分钟
  const minutes = totalSeconds % TIME_CONSTANTS.MINUTES_PER_HOUR;
  totalSeconds = Math.floor(totalSeconds / TIME_CONSTANTS.MINUTES_PER_HOUR);

  // 提取小时
  const hours = totalSeconds % TIME_CONSTANTS.HOURS_PER_DAY;
  let totalDays = Math.floor(totalSeconds / TIME_CONSTANTS.HOURS_PER_DAY);

  // 计算年份
  let year = TIME_CONSTANTS.UNIX_EPOCH_YEAR;
  while (totalDays >= getDaysInYear(year)) {
    totalDays -= getDaysInYear(year);
    year++;
  }

  // 计算月份和日期
  const isLeap = isLeapYear(year);
  const monthDays = DAYS_IN_MONTH[isLeap ? 1 : 0];

  let month = 0;
  while (totalDays >= monthDays[month]) {
    totalDays -= monthDays[month];
    month++;
  }

  const day = totalDays + 1; // 日期从1开始
  month += 1; // 月份从1开始

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds
  };
}

/**
 * 格式化时间戳为指定格式
 * @param {number} timestamp 时间戳（毫秒）
 * @param {string} format 格式字符串，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的时间字符串
 */
function formatTimestamp(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  const timeObj = parseTimestamp(timestamp);

  return format
    .replace('YYYY', padZero(timeObj.year, 4))
    .replace('MM', padZero(timeObj.month))
    .replace('DD', padZero(timeObj.day))
    .replace('HH', padZero(timeObj.hours))
    .replace('mm', padZero(timeObj.minutes))
    .replace('ss', padZero(timeObj.seconds));
}

/**
 * 格式化时间戳为中文格式
 * @param {number} timestamp 时间戳（毫秒）
 * @returns {string} 中文格式的时间字符串
 */
function formatTimestampChinese(timestamp) {
  const timeObj = parseTimestamp(timestamp);

  return `${timeObj.year}年${timeObj.month}月${timeObj.day}日 ${padZero(timeObj.hours)}:${padZero(timeObj.minutes)}:${padZero(timeObj.seconds)}`;
}

const now = 1703123456789; // 示例时间戳

console.log('时间戳:', now);
console.log('标准格式:', formatTimestamp(now));
console.log('自定义格式:', formatTimestamp(now, 'YYYY/MM/DD HH:mm:ss'));
console.log('中文格式:', formatTimestampChinese(now));
console.log('时间对象:', parseTimestamp(now));

// 测试闰年判断
console.log('\n闰年测试:');
console.log('1900年是闰年吗？', isLeapYear(1900)); // false (被100整除但不被400整除)
console.log('2000年是闰年吗？', isLeapYear(2000)); // true  (被400整除)
console.log('2004年是闰年吗？', isLeapYear(2004)); // true  (被4整除但不被100整除)
console.log('2100年是闰年吗？', isLeapYear(2100)); // false (被100整除但不被400整除)
