// filepath: e:\learn\web\algorithm\sort\merge\merge.js
let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21];

/**
 * 归并排序算法。
 *
 * 此函数实现了归并排序，采用递归方法。首先将数组分为左右两部分，
 * 分别对左右子数组进行排序，然后调用 merge 函数将两个有序数组合并成一个有序数组，
 * 最终返回排序后的新数组。
 *
 * @param {number[]} arr - 需要排序的数组，其中每个元素均为数字。
 * @returns {number[]} 返回一个按升序排列的新数组。
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

/**
 * 合并两个已排序的数组。
 *
 * @param {number[]} left - 已排序的左侧数组。
 * @param {number[]} right - 已排序的右侧数组。
 * @returns {number[]} 返回合并后的排序数组。
 */
function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  // 将剩余部分追加到结果数组中
  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort(arr)); // [0, 1, 2, 3, 5, 21, 37, 66, 79, 88]