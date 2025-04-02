let arr = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21]

/**
 * 使用桶排序算法对数组进行升序排序。
 *
 * 算法步骤：
 * 1. 找到数组中的最小值和最大值，确定数据范围。
 * 2. 根据桶的大小（bucketSize）计算需要的桶数量。
 * 3. 将数组中的每个元素放入对应的桶中。
 * 4. 对每个桶内的数组使用插入排序进行排序。
 * 5. 合并所有桶中的数据，得到排序后的数组。
 *
 * @param {number[]} arr - 待排序的数组。
 * @param {number} [bucketSize=5] - 每个桶的大小，默认为5。
 * @returns {number[]} 排序后的数组。
 */
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;

  // 找到数组中的最小值和最大值
  let minValue = arr[0];
  let maxValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) minValue = arr[i];
    if (arr[i] > maxValue) maxValue = arr[i];
  }

  // 计算桶的数量
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = new Array(bucketCount);
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  // 将每个元素放入对应的桶中
  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.floor((arr[i] - minValue) / bucketSize);
    buckets[bucketIndex].push(arr[i]);
  }

  // 使用插入排序对每个桶内的元素排序
  function insertionSort(bucket) {
    for (let i = 1; i < bucket.length; i++) {
      let current = bucket[i];
      let j = i - 1;
      while (j >= 0 && bucket[j] > current) {
        bucket[j + 1] = bucket[j];
        j--;
      }
      bucket[j + 1] = current;
    }
    return bucket;
  }

  // 合并所有已排序的桶
  const sortedArray = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i].length > 0) {
      insertionSort(buckets[i]);
      sortedArray.push(...buckets[i]);
    }
  }
  
  return sortedArray;
}

console.log(bucketSort(arr)); // 输出: 排序后的数组，例如 [0, 1, 2, 3, 5, 21, 37, 66, 79, 88]