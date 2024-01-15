var a = require('./a');
console.log(a.info.value);
a.add();
console.log(a.info.value);
module.exports = {
  info: a.info
};
