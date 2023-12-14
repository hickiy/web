/**
 * 浏览器端
 * settTimeout支持传递2个以上的参数，但是只有第一个参数是必须的，后面的参数会作为回调函数的参数传递
 * 浏览器中的setTimeout的回调函数支持传递一个字符串，但是不推荐使用
 * settiemout的回调函数中的this始终指向window 不受严格模式影响
 * 
 * node端
 * setTimeout支持传递2个以上的参数，但是只有第一个参数是必须的，后面的参数会作为回调函数的参数传递
 * node中的setTimeout的回调函数不支持传递一个字符串
 * settiemout的回调函数中的this始终指向timeout对象，不受严格模式影响
 */

setTimeout(function() {
  'use strict'
  console.log(this)
})