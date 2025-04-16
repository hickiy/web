/**
 * DJB2 Hash 算法实现
 * 
 * 原理说明：
 * DJB2 哈希算法由 Daniel J. Bernstein 提出，是一种简单且分布性较好的字符串哈希算法。
 * 它通过将初始哈希值设置为5381，然后对每个字符执行 hash = hash * 33 + ch，
 * 这样可以有效地分散哈希值，减少冲突。
 * 
 * 公式：hash = hash * 33 + ch
 * 
 * @param {string} str - 需要哈希的字符串
 * @param {number} size - 哈希表的大小，用于限制哈希值范围
 * @returns {number} 哈希值（非负整数）
 */
export default function djb2Hash(str, size) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    // hash = hash * 33 + 当前字符的ASCII码
    hash = ((hash << 5) + hash) + str.charCodeAt(i); // hash * 33 + ch
  }
  // 取模操作，确保哈希值在指定范围内
  return hash % size;
}