console.log(parseInt('0x38', 16)) // 56
console.log(parseInt('070', 8)) // 56

console.log(parseInt('0x38')) // 56
console.log(parseInt('070')) // 70

console.log('\u0038');
console.log('\u{38}');
console.log('\x38');
console.log('\xa0');

const unit8 = Number.prototype.toString.call(56, 8)
const unit16 = Number.prototype.toString.call(41960, 16)
console.log(unit8, unit16)