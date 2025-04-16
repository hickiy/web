/**
 * ELF Hash 算法实现
 * 
 * 原理说明：
 * ELF 哈希算法常用于 UNIX 系统的哈希表实现，通过移位和掩码操作分散哈希值。
 * 
 * @param {string} str - 需要哈希的字符串
 * @param {number} size - 哈希表的大小，用于限制哈希值范围
 * @returns {number} 哈希值（非负整数）
 */
export default function elfHash(str, size) {
  let hash = 0, x = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 4) + str.charCodeAt(i);
    x = hash & 0xF0000000;
    if (x !== 0) {
      hash ^= (x >> 24);
      hash &= ~x;
    }
  }
  return hash % size;
}

// 示例
console.log(elfHash("hello", 100)); // 输出一个哈希值