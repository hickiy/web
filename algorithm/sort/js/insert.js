let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21]

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    let temp = arr[i]
    while (j > 0 && temp < arr[j - 1]) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp
  }
  return arr
}
console.log(insertSort(arr)) // [0, 1, 2, 3, 5, 21, 37, 66, 79, 88]

