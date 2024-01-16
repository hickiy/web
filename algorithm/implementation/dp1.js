// 给你两个数字字符串 num1 和 num2 ，以及两个整数 max_sum 和 min_sum 。如果一个整数 x 满足以下条件，我们称它是一个好整数：
// num1 <= x <= num2
// min_sum <= digit_sum(x) <= max_sum.
// 请你返回好整数的数目。答案可能很大，请返回答案对 10^9 + 7 取余后的结果。
// 注意，digit_sum(x) 表示 x 各位数字之和。

// 示例 1：
// 输入：num1 = "1", num2 = "12", min_num = 1, max_num = 8
// 输出：11
// 解释：总共有 11 个整数的数位和在 1 到 8 之间，分别是 1,2,3,4,5,6,7,8,10,11 和 12 。所以我们返回 11 。

// 示例 2：
// 输入：num1 = "1", num2 = "5", min_num = 1, max_num = 5
// 输出：5
// 解释：数位和在 1 到 5 之间的 5 个整数分别为 1,2,3,4 和 5 。所以我们返回 5 。

// 提示：
// 1 <= num1 <= num2 <= 10^22
// 1 <= min_sum <= max_sum <= 400

// 题目要求求解数值范围在 nums1​ 到 nums2​  之间，
// 并且数位和在 min_sum到 max_sum 之间的整数个数，其中 nums1和 nums2​  以字符串形式给出。
// 此类题目通常使用数位动态规划来求解，关于数位动态规划的详细介绍可以参考。

// 定义函数 get(num)，用于求解 1∼num 范围内有多少整数数位和介于 min_sum∼max_sum 之间，
// 那么原问题就转换为求解 get(num2)−get(num1−1), 因此下文将着重讨论如何求解 get(num)。
// 设 num 共有 n 位，我们从最高位（即第 n−1 位）开始遍历，目前聚焦于第 i 位，
// 前面第 n−1 位到第 i+1 位的数位和为 sum，现在需要考虑第 i 位填充的数字 x。
// 通常 x 可以取 0∼9 中的任意一个数字，但当第 n−1 位到第 i+1
// 位放置的数字都与 num 一样时，x 的取值范围缩小至 0∼num[i]，在代码中，当 limit 为 true 时，表示这一特殊情况发生。
// 试想，如果 limit 标识为 false，x 取值范围为 0∼9 ，那么后续的第 i−1 到第 0 位的取值范围都是 0∼9。
// 这样一来，子问题就与 num 的值无关。
// 我们定义状态 d[i][j] 表示还剩第 i 位到第 0 位的数字未填，而已填的数字位数之和为 j 时，符合条件的数字个数有多少个。
// 在求解时，子问题与 n 的值无关，也与 num 无关，因此只有当 limit 为 false 可以使用或更新 d[i][j]。
// 当然，limit 这一维度也可以加入到状态中，但 limit 为 true 的子问题只会被调用一次，
// 将答案记忆化存储毫无意义，并且每次重新调用 get 时都需要重新计算所有状态答案，得不偿失。
// 因此定义函数 dfs(i,j,limit)用于问题求解，在 limit 为 false 时借助 d[i][j] 防止重复计算，加快执行速度。
// 细节我们采用记忆化搜索的方式实现数位动态规划，将所有 d[i][j] 的初始值设置为 -1。
// 递归过程：
// 若 limit 为 true 时，在 0∼num[i] 范围内遍历 x，并递归调用 dfs(i−1, j+x, limit&&x==nums[i])，统计所有返回值的和作为答案。
// 若 limit 为 false 时，若 d[i][j]≠−1则直接返回 d[i][j]，否则在 0∼9  范围内遍历 x，
// 并递归调用 dfs(i−1, j+x, false)，统计所有返回值的和并更新 d[i][j]。若 j 已经大于 max_sum，可以剪枝，直接返回 0。
// 当 i 等于 -1 时，递归结束，此时若 j ≥ min_sumj  则返回 1，否则返回 0。
// 需要注意的是，由于上文中第 n−1 位表示数字的最高位，第 0 位表示数字的最低位（即个位），因此需要将题目中输入的数字翻转。

var count = function(num1, num2, min_sum, max_sum) {
  const N = 23, M = 401;
  const MOD = 1000000007;
  let d = new Array(N).fill(null).map(() => new Array(M).fill(-1));

  function dfs(num, i, j, limit) {
      if (j > max_sum) {
          return 0;
      }
      if (i === -1) {
          return j >= min_sum ? 1 : 0;
      }
      if (!limit && d[i][j] !== -1) {
          return d[i][j];
      }
      
      let res = 0;
      const up = limit ? num.charCodeAt(i) - '0'.charCodeAt(0) : 9;
      for (let x = 0; x <= up; x++) {
          res = (res + dfs(num, i - 1, j + x, limit && x === up)) % MOD;
      }

      if (!limit) {
          d[i][j] = res;
      }
      return res;
  }

  function get(num) {
      num = num.split("").reverse().join("");
      return dfs(num, num.length - 1, 0, true);
  }

  // 求解 num - 1，先把最后一个非 0 字符减去 1，再把后面的 0 字符变为 9
  function sub(num) {
      let i = num.length - 1;
      let arr = num.split("");
      while (arr[i] === '0') {
          i--;
      }
      arr[i] = String.fromCharCode(arr[i].charCodeAt(0) - 1);
      i++;
      while (i < num.length) {
          arr[i] = '9';
          i++;
      }
      return arr.join("");
  }

  return (get(num2) - get(sub(num1)) + MOD) % MOD;
};

console.log(count('1', '12', 1, 8));