/**
 * Function
 * 使用Function构造函数创建的函数始终在全局作用域中执行
 * 函数内部的this值取决于函数被调用的方式，与普通函数遵循相同的规则
 */

console.log(Function('return this')()) // global
console.log(Function("'use strict'; return this")()) // undefined