function getGlobal() {
  // 'use strict';
  // return this;
  // return Function('return this')();
  return (0, eval)('this');
}
var globals = getGlobal();
console.log(globals);
