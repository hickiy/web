/**
 * 计算从n个数字中选出k个数的所有排列数量
 * 数学公式：P(n, k) = n! / (n - k)!
 * 其中，n! 表示 n 的阶乘，P(n, k) 表示从 n 个元素中取出 k 个元素的排列数。
 *
 * @param {number} n - 总数字个数
 * @param {number} k - 选取的数字个数
 * @returns {number} - 所有可能排列的数量
 */
function permutationCount(n, k) {
  if (k > n || n < 0 || k < 0) return 0;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i);
  }
  return result;
}

// 示例
const n = 4, k = 2;
console.log('排列数量:', permutationCount(n, k));
