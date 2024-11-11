/*数组去重*/

const arr = [1, 2, 3, 4, 5, 5, 5, 5, 5];
// 第一种
function removeDuplicate(arr) {
  let res = [];
  for (item of arr) {
    if (res.indexOf(item) == -1) {
      res.push(item);
    }
  }
  return res;
}
console.log(removeDuplicate(arr)); // [1,2,3,4,5]

// 第二种
console.log([...new Set(arr)]); // [1,2,3,4,5]

// 第三种
console.log(arr.filter((i, index) => arr.slice(index + 1, arr.length).indexOf(i) === -1)); // [1,2,3,4,5]
