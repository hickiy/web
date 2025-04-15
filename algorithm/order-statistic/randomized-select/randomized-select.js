/**
 * 随机选择算法（Randomized-Select）
 * 用于在无序数组中找到第k小的元素，平均时间复杂度为O(n)
 * 
 * @param {number[]} arr - 输入数组
 * @param {number} left - 当前子数组的左边界
 * @param {number} right - 当前子数组的右边界
 * @param {number} k - 要查找的第k小元素（1-based）
 * @returns {number} - 第k小的元素
 */
function randomizedSelect(arr, left, right, k) {
  // 如果子数组只有一个元素，直接返回
  if (left === right) {
    return arr[left];
  }

  // 随机选择一个主元并进行分区
  const pivotIndex = randomizedPartition(arr, left, right);

  // 计算主元在当前子数组中的排名
  const num = pivotIndex - left + 1;

  if (k === num) {
    // 主元就是第k小的元素
    return arr[pivotIndex];
  } else if (k < num) {
    // 第k小的元素在主元左侧
    return randomizedSelect(arr, left, pivotIndex - 1, k);
  } else {
    // 第k小的元素在主元右侧
    return randomizedSelect(arr, pivotIndex + 1, right, k - num);
  }
}

/**
 * 随机选择一个主元并进行分区
 * @param {number[]} arr 
 * @param {number} left 
 * @param {number} right 
 * @returns {number} - 主元的最终位置
 */
function randomizedPartition(arr, left, right) {
  // 在[left, right]范围内随机选择一个索引
  const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
  // 将随机主元交换到末尾
  [arr[pivotIdx], arr[right]] = [arr[right], arr[pivotIdx]];
  // 使用Lomuto分区方案
  return partition(arr, left, right);
}

/**
 * Lomuto分区方案
 * @param {number[]} arr 
 * @param {number} left 
 * @param {number} right 
 * @returns {number} - 主元的最终位置
 */
function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

// 示例用法
const arr = [3, 2, 1, 5, 4, 6];
const k = 3;
console.log(randomizedSelect(arr, 0, arr.length - 1, k)); // 输出第3小的元素