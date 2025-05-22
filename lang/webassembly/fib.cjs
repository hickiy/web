// read the file of the wasm module
const fs = require('fs');
const path = require('path');
const url = path.resolve(__dirname, './fib.wasm');

let n = 40;
const wasmByte = fs.readFileSync(url);
WebAssembly.instantiate(wasmByte).then((results) => {
  var instance = results.instance;
  console.time('计算耗时');
  console.log(`第${n}位斐波那契数是：${instance.exports.fib(n)}`);
  console.timeEnd('计算耗时');
});