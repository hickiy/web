const arr = [1, NaN, Infinity, -Infinity, 'string', true, undefined, null, {}, [], (function () { global.console.log(); }), new Set(), new Map(), Symbol('test')];

const typeOfWay = () => {
  arr.forEach((i) => {
    global.console.log(i, typeof i);
  });
};
/**
  * 1 'number'
  * NaN 'number'
  * Infinity 'number'
  *-Infinity 'number'
  * string string
  * true 'boolean'
  * undefined 'undefined'
  * null 'object'
  * {} 'object'
  * [] 'object'
  * [Function] 'function'
  * Set {} 'object'
  * Map {} 'object'
  * Symbol(test) 'symbol'
 */
const toStringWay = () => {
  arr.forEach((i) => {
    const type = Object.prototype.toString.call(i);
    global.console.log(i, type);
  });
};
/**
 * 1 '[object Number]'
 * NaN '[object Number]'
 * Infinity '[object Number]'
 * -Infinity '[object Number]'
 * string [object String]
 * true '[object Boolean]'
 * undefined '[object Undefined]'
 * null '[object Null]'
 * {} '[object Object]'
 * [] '[object Array]'
 * [Function] '[object Function]'
 * Set {} '[object Set]'
 * Map {} '[object Map]'
 * Symbol(test) '[object Symbol]'
 */
typeOfWay();
toStringWay();
