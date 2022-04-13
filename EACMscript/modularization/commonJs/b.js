var a = require('./a.js');
var count = { value: 1 };
setTimeout(() => {
  console.log('b.js print a.msg:', a.msg);
}, 0);
exports.count = count;
exports.updateCount = function () {
  count.value = 2;
  console.log('b.js update count:', count.value);
}
