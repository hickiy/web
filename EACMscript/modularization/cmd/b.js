define(function (require, exports, module) {
  console.log(require('./c'));
  console.log('b running')
  module.exports = { name: 'b' }
})
