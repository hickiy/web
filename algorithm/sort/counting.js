// filepath: E:/learn/web/algorithm/questions/sort/counting/counting.js

let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21]

/**
 * 使用计数排序算法对数组进行升序排序。
 *
 * 算法步骤：
 * 1. 找到数组中的最小值和最大值，确定数据范围。
 * 2. 初始化计数数组（countArray），大小为(max - min + 1)，并将所有值置为0。
 * 3. 遍历原数组，记录每个元素出现的次数。
 * 4. 根据计数数组构建排序后的数组。
 *
 * @param {number[]} arr - 待排序的数组。
 * @returns {number[]} 排序后的数组。
 */
function countingSort(arr) {
  if (arr.length === 0) return arr;

  // 找到数组中的最小值和最大值
  let minValue = arr[0];
  let maxValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) minValue = arr[i];
    if (arr[i] > maxValue) maxValue = arr[i];
  }

  // 初始化计数数组
  const countArrayLength = maxValue - minValue + 1;
  const countArray = new Array(countArrayLength).fill(0);

  // 统计每个元素出现的次数
  for (let i = 0; i < arr.length; i++) {
    countArray[arr[i] - minValue]++;
  }

  // 构建排序后的数组
  let sortedIndex = 0;
  for (let i = 0; i < countArray.length; i++) {
    while (countArray[i] > 0) {
      arr[sortedIndex] = i + minValue;
      sortedIndex++;
      countArray[i]--;
    }
  }

  return arr;
}

console.log(countingSort(arr)); // 输出: 排序后的数组，例如 [0, 1, 2, 3, 5, 21, 37, 66, 79, 88]