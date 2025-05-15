/**
 * 0-1背包问题（动态规划解法）
 * 
 * 问题描述：
 * 给定n个物品，每个物品有重量w[i]和价值v[i]，背包容量为C。
 * 每个物品只能选择放或不放，求在不超过背包容量的情况下，最大总价值。
 * 
 * 动态规划思想：
 * 1. 定义状态：dp[i][j]表示前i个物品，容量为j时的最大价值。
 * 2. 状态转移：
 *    - 不选第i个物品：dp[i][j] = dp[i-1][j]
 *    - 选第i个物品（前提j>=w[i-1]）：dp[i][j] = dp[i-1][j-w[i-1]] + v[i-1]
 *    - 取两者最大值
 * 3. 初始化：dp[0][*]=0（没有物品时价值为0）
 * 4. 答案：dp[n][C]
 */

function knapsack01(weights, values, capacity) {
  const n = weights.length;
  // 创建二维dp数组，行数n+1，列数capacity+1
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  // 遍历每个物品
  for (let i = 1; i <= n; i++) {
    // 遍历每个容量
    for (let j = 0; j <= capacity; j++) {
      if (j < weights[i - 1]) {
        // 当前容量不足以放下第i个物品，只能不选
        dp[i][j] = dp[i - 1][j];
      } else {
        // 选或不选第i个物品，取最大值
        dp[i][j] = Math.max(
          dp[i - 1][j], // 不选
          dp[i - 1][j - weights[i - 1]] + values[i - 1] // 选
        );
      }
    }
  }

  // 返回最大价值
  return dp[n][capacity];
}

// 示例
const weights = [2, 1, 3, 2];
const values = [12, 10, 20, 15];
const capacity = 5;
console.log(knapsack01(weights, values, capacity)); // 输出：37