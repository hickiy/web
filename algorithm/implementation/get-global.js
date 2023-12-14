/**
 * 这种方式可以获取到全局对象，在严格模式下，this返回undefined
 * 对于一些默认使用严格模式的环境，这种方法无效
 */
console.log(Function('return this')()); // global
console.log(Function("'use strict'; return this")()); // undefined

/**
 * 这种方式可以获取到全局对象，不受严格模式影响，并且在浏览器和Node环境下都有效
 * 是一种通用的获取全局对象的方法
 */
console.log((0, eval)('this')); // global
console.log((0, eval)("'use strict'; this")); // global
