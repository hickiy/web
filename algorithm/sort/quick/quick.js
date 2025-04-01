let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21];

/**
 * 快速排序算法。
 *
 * 此函数实现了快速排序，采用递归方法。首先选取数组的最后一个元素作为基准，
 * 然后将数组中小于基准的元素归入左侧数组，大于或等于基准的元素归入右侧数组，
 * 随后递归地对左右子数组进行排序，最后将排序后的左侧数组、基准值和排序后的右侧数组合并，
 * 从而返回一个排序后的新数组。
 *
 * @param {number[]} arr - 需要排序的数组，其中每个元素均为数字。
 * @returns {number[]} 返回一个按升序排列的新数组。
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return quickSort(left).concat(pivot, quickSort(right));
}

console.log(quickSort(arr)); // [0, 1, 2, 3, 5, 21, 37, 66, 79, 88]