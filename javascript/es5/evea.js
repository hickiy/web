/**
 * 浏览器环境下的eval
 * 在函数作用域中直接调用eval，this指外部函数的this
 * 在函数作用域中间接调用eval，在全局作用域中执行，this指window, 不受严格模式影响
 * 在全局直接调用eval，在全局作用域中执行，this指向window, 不受严格模式影响
 * 在全局间接调用eval，在全局作用域中执行，this指向window, 不受严格模式影响
 *
 * Node环境下的eval
 * 在函数作用域中直接调用eval，this指向外部函数的this
 * 在函数作用域中间接调用eval，，this指向global, 不受严格模式影响
 * 在模块顶层直接调用eval，this指向模块对象（exports）, 不受严格模式影响
 * 在模块顶层间接调用eval，this指向global, 不受严格模式影响
 */

console.log(eval('this')); // exports
console.log(eval("'use strict'; this")); // exports
console.log((0, eval)("'use strict'; this")); // global



/**
 * 这种方式可以获取到全局对象，不受严格模式影响，并且在浏览器和Node环境下都有效
 * 是一种通用的获取全局对象的方法
 */
console.log((0, eval)('this')); // global
console.log((0, eval)("'use strict'; this")); // global
