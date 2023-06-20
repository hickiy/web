(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports === 'object') exports['namespace'] = factory();
  else root['namespace'] = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  // 要导出的内容
  const doSomeThing = () => {};
  return {
    doSomeThing
  };
});