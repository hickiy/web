// read the file of the wasm module
const fs = require('fs');
const path = require('path');
const { start } = require('repl');
const url = path.resolve(__dirname, './fib.wasm');
const wasmByte = fs.readFileSync(url);
WebAssembly.instantiate(wasmByte).then((results) => {
  var instance = results.instance;
  console.time('fib by wasm');
  var fib = instance.exports.fib(41);
  console.log(fib);
  console.timeEnd('fib by wasm');
});

function fib(n) {
  if (typeof n !== 'number' || n < 1) {
    throw new TypeError('fibonacci: argument "n" expect a "number" gt(>) zero');
  }
  if (n === 1 || n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

console.time('fib');
console.log(fib(41));
console.timeEnd('fib');

// 证明了 wasm 在计算密集型的场景下，性能优于 js
// 翻译为英语：wasm is faster than js in compute-intensive scenarios

// 在计算制定位数的斐波那契数列时，对比wasm和js的性能
// 翻译为英语：Compare the performance of wasm and js when calculating the specified number of Fibonacci sequences