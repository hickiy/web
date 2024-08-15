var strs = {
  set1: ",/?:@&:+$",  // 保留字符  encodeURI 不转义
  set3: "#",           // 特殊数字标志 encodeURI 不转义
  set2: "-_.~!*'()",   // 不转义字符  encodeURI encodeUEIComponent 都不转义
  set4: "ABCabc123", // 字母数字也属于不转义字符 encodeURI encodeUEIComponent 都不转义
  set5: " |`^%[]", // 其他字字符 encodeURI encodeUEIComponent 都转义,（方括号[]在RFC3986中是保留字符）
};

Object.keys(strs).forEach(key => {
  console.log(encodeURI(strs[key]))
})
console.log('-------------------')
Object.keys(strs).forEach(key => {
  console.log(encodeURIComponent(strs[key]));
})


