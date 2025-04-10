const arr = [1, 2, 3, 4, 5, 5, 5, 5, 5];

// 基于splice的原址去重的方法
function splice(arr) {
  for (let i = 0; i < arr.length; i++) {
    let dupIndex = arr.indexOf(arr[i], i + 1);
    if (dupIndex >= 0) {
      arr.splice(dupIndex, 1);
      i--;
    }
  }
  return arr;
}
console.log(splice(arr));