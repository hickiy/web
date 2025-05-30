/**
 * 实现确定性选择算法 (median-of-medians) 求第 k 小/大的元素
 * 说明：k 参数按 1-indexed 处理
 */

/**
 * 求数组 arr 中第 k 小元素（1 ≤ k ≤ arr.length）
 * @param {number[]} arr - 待查找数组
 * @param {number} k - 要查找的第 k 小元素（1-indexed）
 * @returns {number} 第 k 小的元素
 */
function deterministicSelect(arr, k) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("数组为空或无效");
  }
  if (k < 1 || k > arr.length) {
    throw new Error("k 越界");
  }
  return select(arr, k);
}

/**
 * 递归实现确定性选择算法
 * @param {number[]} arr 
 * @param {number} k 
 * @returns {number}
 */
function select(arr, k) {
  // 如果数组中元素数量较少，直接排序后返回
  if (arr.length <= 5) {
    arr.sort((a, b) => a - b);
    return arr[k - 1];
  }

  // 将数组划分为若干个长度最多为 5 的小组，计算每个小组的中位数
  const medians = [];
  for (let i = 0; i < arr.length; i += 5) {
    const chunk = arr.slice(i, i + 5);
    chunk.sort((a, b) => a - b);
    const median = chunk[Math.floor(chunk.length / 2)];
    medians.push(median);
  }
  
  // 求出中位数的中位数作为 pivot
  const pivot = select(medians, Math.floor((medians.length + 1) / 2));

  // 根据 pivot 将原数组分成三个部分：小于、等于、大于 pivot
  const less = [];
  const equal = [];
  const greater = [];
  for (const num of arr) {
    if (num < pivot) less.push(num);
    else if (num > pivot) greater.push(num);
    else equal.push(num);
  }

  if (k <= less.length) {
    return select(less, k);
  } else if (k > less.length + equal.length) {
    return select(greater, k - less.length - equal.length);
  } else {
    // k 落在等于 pivot 的区间内
    return pivot;
  }
}

/**
 * 求数组 arr 中第 k 大元素（1 ≤ k ≤ arr.length）
 * 转换为求第 (arr.length - k + 1) 小的元素
 * @param {number[]} arr 
 * @param {number} k 
 * @returns {number}
 */
function kthLargest(arr, k) {
  if (k < 1 || k > arr.length) {
    throw new Error("k 越界");
  }
  const kthSmallestIndex = arr.length - k + 1;
  return deterministicSelect(arr, kthSmallestIndex);
}

// 示例用法:
const arr = [7, 10, 4, 3, 20, 15];
console.log("第 3 小元素:", deterministicSelect(arr, 3));
console.log("第 2 大元素:", kthLargest(arr, 2));

