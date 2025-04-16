/**
 * BKDR Hash 算法实现
 * 
 * 原理说明：
 * BKDR (Brian Kernighan and Dennis Ritchie) 哈希算法是一种简单高效的字符串哈希算法。
 * 它通过一个种子（通常取131或31等质数）不断乘以当前的哈希值并加上当前字符的ASCII码，
 * 这样可以有效避免哈希冲突，适合字符串哈希。
 * 
 * 公式：hash = hash * seed + ch
 * 
 * @param {string} str - 需要哈希的字符串
 * @param {number} size - 哈希表的大小，用于限制哈希值范围
 * @param {number} [seed=31] - 可选，哈希种子，默认31
 * @returns {number} 哈希值（非负整数）
 */
export default function bkdrHash(str, size, seed = 31) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // hash = hash * seed + 当前字符的ASCII码
    hash = hash * seed + str.charCodeAt(i);
  }
  // 取模操作，确保哈希值在指定范围内
  return hash % size;
}

// 示例
console.log(bkdrHash("hello", 100)); // 输出一个哈希值