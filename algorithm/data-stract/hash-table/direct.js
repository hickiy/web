// 直接寻址哈希表（Direct Address Table）实现
// 适用于键的取值范围较小且已知的情况

class DirectAddressTable {
  constructor(size) {
    // 创建一个指定大小的数组，初始值为null
    this.table = new Array(size).fill(null);
  }

  // 插入键值对
  insert(key, value) {
    // 直接将值存储在以key为下标的位置
    this.table[key] = value;
  }

  // 查找指定键的值
  search(key) {
    // 直接返回以key为下标的值
    return this.table[key];
  }

  // 删除指定键的值
  delete(key) {
    // 将以key为下标的位置设为null，表示删除
    this.table[key] = null;
  }
}

// 示例用法
const dat = new DirectAddressTable(100); // 假设键的范围为0~99
dat.insert(10, 'apple');
dat.insert(20, 'banana');
console.log(dat.search(10)); // 输出: apple
dat.delete(10);
console.log(dat.search(10)); // 输出: null