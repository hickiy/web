/* JSON序列化注意事项 */
/**
 * 接受第二个参数，类似与对数据库操作时的投影，只序列化/反序列化第二个参数指定的属性list
 */
const obj = {
  null: null, // null
  nan: NaN, // null
  max: Infinity, // null
  min: -Infinity, // null
  reg: /\.\s/, // {}
  set: new Set([1, 2, 3]), // {}
  map: new Map([['key', 'value']]), // {}
  err: new Error('测试错误'), // {}
  date: new Date(), // 2023-12-19T02:55:00.754Z
  string: '...', // '...'
  number: 1, // 1
  boolen: true, // true
  object: { property: 'object' }, // { property: 'object' }
  notDefined: undefined, // 将被忽略
  symbol: Symbol('symbol'), // 将被忽略
  fun: function fun() { },// 将被忽略 
  array: [
    'elment', // 'elment'
    Symbol('symbol'), // null 这与在对象中的表现不同
    function () {}, // null 这与在对象中的表现不同
    undefined, // null 这与在对象中的表现不同
    Infinity, // null
    -Infinity, // null
    NaN, // null
  ],
};

Object.defineProperty(obj, 'intorate', {
  value: 'intorate', // 将被忽略 ，因为不可枚举
  configurable: true,
  enumerable: false,
  writable: true
});

const ojbStr = JSON.stringify(obj);
const extypalObj = JSON.parse(ojbStr);
global.console.log(ojbStr, '\n\n', extypalObj);
