/**
 * AP Hash 算法实现
 * 
 * 原理说明：
 * AP 哈希算法采用奇偶位不同的处理方式，能有效减少哈希冲突。
 * 
 * @param {string} str - 需要哈希的字符串
 * @param {number} size - 哈希表的大小，用于限制哈希值范围
 * @returns {number} 哈希值（非负整数）
 */
export default function apHash(str, size) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    if ((i & 1) === 0) {
      hash ^= ((hash << 7) ^ str.charCodeAt(i) ^ (hash >> 3));
    } else {
      hash ^= (~((hash << 11) ^ str.charCodeAt(i) ^ (hash >> 5)));
    }
  }
  return hash % size;
}

// 示例
console.log(apHash("hello", 100)); // 输出一个哈希值