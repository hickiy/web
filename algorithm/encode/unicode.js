import { TextEncoder, TextDecoder } from 'util';

var utf8encoder = new TextEncoder();
var utf8decoder = new TextDecoder();
var char = "✓";
var charCodeAt = char.charCodeAt(0);
var unit8Array = utf8encoder.encode(char);
var binString = Array.from(unit8Array, function (c) {
  return String.fromCharCode(c);
}).join('');
var base64 = btoa(binString);
var decoded64 = atob(base64);
var decoded = utf8decoder.decode(new Uint8Array(decoded64.split('').map(function (c) {
  return c.charCodeAt(0);
})));

console.log('char:', char);
console.log('charCode:', charCodeAt);
console.log('unit8Array:', unit8Array);
console.log('binString:', binString);
console.log('base64:', base64);
console.log('decoded64:', decoded64);
console.log('Decoded:', decoded);