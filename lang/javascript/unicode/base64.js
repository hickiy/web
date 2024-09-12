// btoa equivalent in Node.js
const btoa = (str) => Buffer.from(str, 'binary').toString('base64');

// atob equivalent in Node.js
const atob = (base64) => Buffer.from(base64, 'base64').toString('binary');

const { TextDecoder, TextEncoder } = require('util');

console.log(btoa('a')); // YQ==
console.log(atob('YQ==')); // a


console.log(
  btoa(
    Array.from(new TextEncoder().encode("✓"), i => String.fromCharCode(i)).join('')
  )
); //4pyT

console.log(
  new TextDecoder().decode(
    new Uint8Array(
      atob('4pyT').split('').map((i) => i.charCodeAt(0)))
  )
); // ✓