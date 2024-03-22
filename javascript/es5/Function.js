/**
 * Function
 * 使用Function构造函数创建的函数始终在全局作用域中执行
 * 函数内部的this值取决于函数被调用的方式，与普通函数遵循相同的规则
 */

console.log(Function('return this')()) // global
console.log(Function("'use strict'; return this")()) // undefined


/**
 * 这种方式可以获取到全局对象，在严格模式下，this返回undefined
 * 对于一些默认使用严格模式的环境，这种方法无效
 */
console.log(Function('return this')()); // global
console.log(Function("'use strict'; return this")()); // undefined
