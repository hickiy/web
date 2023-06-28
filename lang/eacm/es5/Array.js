const arr = [1, 2, 5, 5, 6, 8, 9, 8];

/*数组去重*/
// 第一种
console.log([...new Set(arr)]);
// 第二种
console.log(arr.filter((i, index) => arr.slice(index + 1, arr.length).indexOf(i) === -1));

/*找最大最小*/
console.log(Math.max(...arr), Math.min(...arr))
console.log(arr.sort((a, b) => a -b)[arr.length - 1], arr[0])