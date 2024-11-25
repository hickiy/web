const arr = [1, 2, 3, 4, 5, 5, 5, 5, 5];

// 利用indexOf去重
function indexOf(arr) {
  let res = [];
  for (item of arr) {
    res.indexOf(item) == -1 && res.push(item);
  }
  return res;
}
// console.log(indexOf(arr));

// 利用filter去重
function filter(arr) {
  return arr.filter((i, index) => arr.indexOf(i, index + 1) == -1);
}
// console.log(filter(arr));

// 利用set的特性进行去重
function set(arr) {
  return Array.from(new Set(arr));
}
// console.log(set(arr));


// 以上三种方法都是基于新数组的去重方法，下面是基于原数组的去重方法
// 基于splice的原址去重的方法
function splice(arr) {
  for (let i = 0; i < arr.length; i++) {
    let dupIndex = arr.indexOf(arr[i], i + 1);
    if (dupIndex >= 0) {
      arr.splice(dupIndex, 1);
      i--;
    }
  }
}
splice(arr);
console.log(arr);
