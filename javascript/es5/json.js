/* JSON序列化注意事项 */
/**
 * 接受第二个参数，类似与对数据库操作时的投影，只序列化/反序列化第二个参数指定的属性list
 */
const obj = {
  nan: NaN, // null
  max: Infinity, // null
  min: -Infinity, // null
  reg: /\.\s/, // {}
  set: new Set([1, 2, 3]), // {}
  map: new Map([['key', 'value']]), // {}
  err: new Error('测试错误'), // {}
  date: new Date(), // 2023-12-19T02:55:00.754Z
  notDefined: undefined, // 将被忽略
  null: null, // null
  string: '...', // '...'
  number: 1, // 1
  boolen: true, // true
  object: { property: 'object' }, // { property: 'object' }
  array: [
    'elment', // 'elment'
    Symbol('symbol'), // null
    function () {
      console.log('function');
    }, // null
    undefined // null
  ],
  symbol: Symbol('symbol'), // 将被忽略
  fun: function fun() {
    console.log('function');
  } // 将被忽略
};

Object.defineProperty(obj, 'intorate', {
  value: 'intorate', // 被忽略，因为不可枚举
  configurable: true,
  enumerable: false,
  writable: true
});

const ojbStr = JSON.stringify(obj);
const extypalObj = JSON.parse(ojbStr);
global.console.log(ojbStr, '\n\n', extypalObj);
