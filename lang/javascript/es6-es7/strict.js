/**
 * 严格模式是基于模块和函数的，他们只影响当前模块或函数
 * 不会影响导入的模块或者导入当前模块的模块
 */

function global() {
  'use strict';
  console.log(this);
}
function global1() {
  console.log(this);
}
global();
global1();
