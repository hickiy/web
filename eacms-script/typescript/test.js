function key() {
  console.log('key')
  return 'key'
}
function value() {
  console.log('value')
  return 'value'
}

var obj = {};
obj[key()] = value();
