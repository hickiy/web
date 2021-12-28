// 前瞻匹配与后顾匹配
const text = '18372634789';
const reg = /(?<=\d{3,})\d(?=\d{4,})/g
console.log(text.replace(reg, '*'))