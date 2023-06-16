const fs = require('fs');
const path = require('path');
var wasmMem = new WebAssembly.Memory({ initial: 1 });
function printString(offset, length) {
  var bytes = new Uint8Array(wasmMem.buffer, offset, length);
  var string = new TextDecoder('utf8').decode(bytes);
  console.log(string);
}
var wasmImports = {
  js: {
    mem: wasmMem,
    print: printString
  }
};
const buf = fs.readFileSync(path.join(__dirname, 'hello-world.wasm'));
const wasmModule = new WebAssembly.Module(buf);
const wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);
console.log(wasmInstance.exports.main(), '\n\x37\x38\xa0\xa1\xa2');
