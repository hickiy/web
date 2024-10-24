/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
var minExtraChar = function (s, dictionary) {
  const dp = new Array(s.length + 1).fill(0);
  for (let i = 0; i < s.length; i++) {
    const cur = s.slice(0, i + 1);
    // 默认是在 s[0]...s[i - 1] 的基础上增加 s[i]
    dp[i + 1] = dp[i] + 1;
    for (const word of dictionary) {
      // 如果存在满足情况的单词，取最优解
      if (cur.endsWith(word)) {
        dp[i + 1] = Math.min(dp[i + 1], dp[i - word.length + 1]);
      }
    }
  }
  return dp[s.length];
};
s = 'bvbv';
let dictionary = ['bvb', 'bv'];

console.log(minExtraChar(s, dictionary));
