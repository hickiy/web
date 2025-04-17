/**
 * RS Hash 算法实现
 * 
 * 原理说明：
 * RS 哈希算法由 Robert Sedgwicks 提出，常用于字符串哈希。
 * 其核心思想是通过不断变化的乘数 a，结合字符值生成哈希值。
 * 
 * 公式：
 *   hash = hash * a + ch
 *   a 初始为 63689，每次循环 a = a * 378551
 * 
 * @param {string} str - 需要哈希的字符串
 * @param {number} size - 哈希表的大小，用于限制哈希值范围
 * @returns {number} 哈希值（非负整数）
 */
export default function rsHash(str, size) {
  let b = 378551;
  let a = 63689;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = hash * a + str.charCodeAt(i);
    a *= b;
  }
  return Math.abs(hash) % size;
}

// 示例
console.log(rsHash("hello", 100)); // 输出一个哈希值