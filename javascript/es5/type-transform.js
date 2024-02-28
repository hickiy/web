/**
 * 算术运算的隐式类型转换
 * js中算术运算，隐式类型转换的目标是number类型
 * 当进行加法运算，并且存在操作数是string类型时，转换目标是string类型
 */
1 + true; // 2
1 + "1"; // "11"
1 - "1"; // 0

/**
 * 逻辑运算的隐式类型转换
 * js中逻辑运算，隐式类型转换的目标boolean类型
 */
if (1 && true); // true
if (1 || false); // true

/**
 * 比较运算的隐式类型转换
 * js中比较运算，隐式类型转换的目标是number类型
 * 当进行相等比较运算时，转换目标任然是number类型，但是null和undefined除外
 */
1 == true; // true
0 == false; // true
0 == null // false
0 == undefined // false

/**
 * 位运算的隐式类型转换
 * js中位运算，隐式类型转换的目标是number类型
 */

Number([]) // 0
~([]) // -1
1 << ['1'] // 2

/**
 * 引用类型到基本类型的隐式类型转换
 * 首先调用valueOf方法，如果返回基本类型值，并且是目标类型，则直接使用，否者进行到目标类型的隐式类型转换
 * 如果valueOf方法返回的是引用类型值，则调用toString方法
 * 如果toString方法返回基本类型值，并且是目标类型，则直接使用，否则进行到目标类型的隐式类型转换
 * 如果valueOf和toString方法都返回引用类型值，则报错
 */
var obj = {
  valueOf: function () {
    console.log('valueOf');
    return {};
  },
  toString: function () {
    console.log('toString');
    return {};
  }
}
console.log('' + obj) // TypeError: Cannot convert object to primitive value



