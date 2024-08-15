define('a', ['./b', './c'], function (require, exports, module) {
  console.log(require('./b'));
  console.log('a running')
  module.exports = { name: 'a' }
})
