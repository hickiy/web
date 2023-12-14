// 要导出的内容
const doSomeThing = () => {
  console.log('do some thing');
};
(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports === 'object') exports['namespace'] = factory();
  else root['namespace'] = factory();
})(Function('return this')(), function () {
  'use strict';
  return {
    doSomeThing
  };
});
