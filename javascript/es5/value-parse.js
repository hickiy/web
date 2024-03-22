console.log(parseInt('0x38', 16)) // 56
console.log(parseInt('070', 8)) // 56
console.log((56).toString(16).padStart(4, '0x')) // 0x38
console.log((56).toString(8).padStart(4, '0o')) // 0o70

console.log('\u0038'); // 8
console.log('\x38'); // 8
console.log('8'.charCodeAt().toString(16).padStart(6, '\\u00')); // \u0038
console.log('8'.charCodeAt().toString(16).padStart(4, '\\x')); // \x38

