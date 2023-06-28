// 前瞻匹配与后顾匹配
// const text = '18372634789';
// const reg = /(?<=\d{3,})\d(?=\d{4,})/g
// console.log(text.replace(reg, '*'))


var search = '?code=IWsGtLqtOQ+py/xlqrmhWj4ORf0MbP7o+w5iJhDoEs33tEvaxSiBGugkrVVTQhRqIqGQmwT/Zoi66w8KmIhCxQ==&fdId=185ba3a8def8fa06f2dd585447ab5635&serverurl=https%3A%2F%2Fportaltest.ionrocking.com%2Ffile%2Fviewer&failUrl=https%3A%2F%2Fportaltest.ionrocking.com%2Flogin'
var code = search.replace(/^.*code=([^&]+).*$/ig, '$1');
var id = search.replace(/^.*fdId=([^&]+).*$/ig, '$1');
console.log(code, id);
