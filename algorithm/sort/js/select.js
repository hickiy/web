let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21]

function selectionSort(arr) {
  let len = arr.length;
  for (let j = 0; j < len - 1; j++) {
    let minimum = j;
    for (let i = j + 1; i < len; i++) {
      if (arr[i] < arr[minimum]) {
        minimum = i;
      }
    }
    [arr[j], arr[minimum]] = [arr[minimum], arr[j]];
  }
  return arr;
}