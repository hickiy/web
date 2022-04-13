const b = require('./b.js');
console.log('a.js print init b.count:', b.count.value);
setTimeout(() => {
  b.updateCount();
  console.log('a.js print updated b.count:', b.count.value);
})

exports.msg = 'eval complated';