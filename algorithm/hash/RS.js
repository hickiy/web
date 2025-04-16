/**
 * SDBM Hash 算法实现
 * 
 * 原理说明：
 * SDBM 哈希算法是一种经典的字符串哈希算法，广泛用于数据库和哈希表。
 * 其核心思想是通过移位和加法操作，快速生成分布均匀的哈希值。
 * 
 * 公式：hash = hash * 65599 + ch
 * 
 * @param {string} str - 需要哈希的字符串
 * @param {number} size - 哈希表的大小，用于限制哈希值范围
 * @returns {number} 哈希值（非负整数）
 */
export default function sdbmHash(str, size) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
  }
  return hash % size;
}

// 示例
console.log(sdbmHash("hello", 100)); // 输出一个哈希值