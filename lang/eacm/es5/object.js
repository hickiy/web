// console.log(Object(1)); // [Number: 1]
// console.log(Object('1')); // [String: '1']
// console.log(Object(true)); // [Boolean: true]
// console.log(Object(Symbol())); // [Symbol: Symbol()]
// console.log(Object(null)); // {}
// console.log(Object(undefined)); // {}
// console.log(Object([])); // []
// console.log(Object({})); // {}
// console.log(Object(function() {})); // [Function (anonymous)]
// console.log(Object(new Date())); // 2020-01-01T00:00:00.000Z
// console.log(Object(/a/g)); // /a/g
// console.log(new Set([[1, 2]])); // Set(1) { [ 1, 2 ] }
// console.log(new Map([[1, 2]])); // Map(1) { 1 => 2 }

console.log(Object(1) instanceof Number); // true
console.log(Object('1') instanceof String); // true
console.log(Object(true) instanceof Boolean); // true
console.log(Object(Symbol()) instanceof Symbol); // true
console.log(Object(null) instanceof Object); // true
console.log(Object(undefined) instanceof Object); // true
console.log(Object([]) instanceof Array); // true
console.log(Object({}) instanceof Object); // true
console.log(Object(function() {}) instanceof Function); // true
console.log(Object(new Date()) instanceof Date); // true
console.log(Object(/a/g) instanceof RegExp); // true
console.log(new Set([[1, 2]]) instanceof Set); // true
console.log(new Map([[1, 2]]) instanceof Map); // true

