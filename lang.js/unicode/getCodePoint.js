// 示例字符：𠮷 (U+20BB7)， 第二平面字符，需要用一个utf-16代理对表示，即两个码元
const str = '𠮷';

// 获取字符的码点
console.log(str.codePointAt(0)); // 输出：134071  有效的unicode码点
console.log(str.codePointAt(1)); // 输出：57271   无效的unicode码点，即utf-16编码单元

console.log(str.charCodeAt(0)); // 输出：55362  无效的unicode码点，即utf-16编码单元
console.log(str.charCodeAt(1)); // 输出：57271  有效的unicode码点，即utf-16编码单元