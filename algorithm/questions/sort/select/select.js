
let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21]
/**
 * 选择排序算法
 *
 * 该函数实现了选择排序算法，对传入的数字数组进行升序排序。
 * 每次从未排序的部分中选取最小的数字，并将其与前面的已排序部分交换位置。
 *
 * @param {number[]} arr - 待排序的数组，数组中所有元素均为数字。
 * @returns {number[]} 返回排序后的数组。
 */
function selectionSort(arr) {
  let len = arr.length;
  for (let j = 0; j < len - 1; j++) {
    let minimum = j;
    for (let i = j + 1; i < len; i++) {
      if (arr[i] < arr[minimum]) {
        minimum = i;
      }
    }
    let temp = arr[j];
    arr[j] = arr[minimum];
    arr[minimum] = temp;
  }
  return arr;
}
console.log(selectionSort(arr)); // [0, 1, 2, 3, 5, 21, 37, 66, 79, 88]