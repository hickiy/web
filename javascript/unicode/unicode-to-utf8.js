/**
 * 将unicode转换为utf8
 * @param {*} unicode 
 * @returns utf8
 */
function unicodeToUtf8(unicode) {
  let codePoint = Number.parseInt(unicode, 16);
  let bytes = [];

  if (codePoint <= 0x7F) {
    bytes.push(codePoint);
  } else if (codePoint <= 0x7FF) {
    bytes.push(0xC0 | (codePoint >> 6), 0x80 | (codePoint & 0x3F));
  } else if (codePoint <= 0xFFFF) {
    bytes.push(0xE0 | (codePoint >> 12), 0x80 | ((codePoint >> 6) & 0x3F), 0x80 | (codePoint & 0x3F));
  }

  return bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
/**
 * 这里演示手动的百分号编码
 * 百分号编码实际上也是将字符转换为utf8，然后使用%分隔
 * 这样做的好处是可以在url所有的字符都可以使用ascii码表示
 * 在解码时，将一个百分号码元或者多个百分号码元视为一个utf8字符
 */
let char = '名';
let unicode = char.charCodeAt(0).toString(16);
let utf8 = unicodeToUtf8(unicode);
let uri = utf8.replace(/([0-9a-f]{2})/g, '%$1').toUpperCase()
let uri1 = encodeURI(char);
console.log(uri, uri1);