function utf8ArrayToString(array) {
  var decoder = new TextDecoder('utf-8');
  return decoder.decode(new Uint8Array(array));
}

let char = '名';
let uri = encodeURI(char); // %E5%90%8D
var utf8Array = uri.replace(/%/g, '').match(/.{2}/g).map((byte) => parseInt(byte, 16));
console.log(utf8ArrayToString(utf8Array)); 