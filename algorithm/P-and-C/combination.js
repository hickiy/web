/**
 * 计算从n个数字中选出k个数的所有组合数量
 * 数学公式：C(n, k) = n! / (k! * (n - k)!)
 * 其中，n! 表示 n 的阶乘，C(n, k) 表示从 n 个元素中取出 k 个元素的组合数。
 *
 * @param {number} n - 总数字个数
 * @param {number} k - 选取的数字个数
 * @returns {number} - 所有可能组合的数量
 */
function combinationCount(n, k) {
  if (k > n || n < 0 || k < 0) return 0;
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result *= (n - i + 1) / i;
  }
  return Math.round(result);
}

// 示例
const n = 4, k = 2;
console.log('组合数量:', combinationCount(n, k));