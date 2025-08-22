let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/*找最大最小*/
console.log(Math.max(...arr), Math.min(...arr)) // 9 1
console.log(arr.sort((a, b) => a - b)[arr.length - 1], arr[0]) // 9 1