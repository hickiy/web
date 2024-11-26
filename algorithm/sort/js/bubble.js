let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21]

function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
console.log(bubbleSort(arr)); // [0, 1, 2, 3, 5, 21, 37, 66, 79, 88]