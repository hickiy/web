var strs = {
  set1: ",,/?:@&:+$",  // 保留字符  encodeURI 不转义
  set2: "-_.~!*'()",   // 不转义字符  encodeURI encodeUEIComponent 都不转义
  set3: "#",           // 数字标志 encodeURI 不转义
  set4: "ABCabc123", // 字母数字字符和空格 encodeURI encodeUEIComponent 都不转义
  set5: " |`^", // 其他字符 encodeURI encodeUEIComponent 都转义
};


// console.log(encodeURIComponent(str).replace(/[!*'()]/g, function (c) {
//   return '%' + c.charCodeAt(0).toString(16).toUpperCase(),
// })),

[1, 2, 3, 4, 5].forEach(i => {
  // console.log(encodeURI(strs['set' + i]))
  console.log(encodeURIComponent(strs['set' + i]));
})
