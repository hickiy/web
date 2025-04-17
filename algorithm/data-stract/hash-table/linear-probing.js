

/**
 * 基于开放寻址法（线性探测）的哈希表实现
 * 支持 put、get、remove 基本操作
 */

class OpenAddressingHashTable {
  constructor(size = 16) {
    // 初始化哈希表容量
    this.size = size;
    // 存储键值对的数组，初始为 undefined
    this.table = new Array(size);
    // 记录当前元素数量
    this.count = 0;
  }

  bkdrHash(str, size, seed = 31) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // hash = hash * seed + 当前字符的ASCII码
      hash = hash * seed + str.charCodeAt(i);
    }
    // 取模操作，确保哈希值在指定范围内
    return hash % size;
  }

  // 插入或更新键值对
  put(key, value) {
    if (this.count / this.size > 0.7) {
      // 负载因子超过0.7时扩容
      this._resize(this.size * 2);
    }
    let idx = this.bkdrHash(key, this.size);
    // 线性探测：如果当前位置被占用且不是同一个key，则向后查找
    while (
      this.table[idx] !== undefined &&
      this.table[idx].key !== key &&
      !this.table[idx].deleted
    ) {
      idx = (idx + 1) % this.size;
    }
    // 如果是新插入，计数加一
    if (
      this.table[idx] === undefined ||
      this.table[idx].deleted
    ) {
      this.count++;
    }
    // 存储键值对
    this.table[idx] = { key, value, deleted: false };
  }

  // 获取指定key的值
  get(key) {
    let idx = this.bkdrHash(key, this.size);
    let startIdx = idx;
    // 线性探测查找
    while (this.table[idx] !== undefined) {
      if (
        !this.table[idx].deleted &&
        this.table[idx].key === key
      ) {
        return this.table[idx].value;
      }
      idx = (idx + 1) % this.size;
      // 防止死循环
      if (idx === startIdx) break;
    }
    return undefined; // 未找到
  }

  // 删除指定key的键值对
  remove(key) {
    let idx = this.bkdrHash(key, this.size);
    let startIdx = idx;
    while (this.table[idx] !== undefined) {
      if (
        !this.table[idx].deleted &&
        this.table[idx].key === key
      ) {
        // 标记为已删除（惰性删除）
        this.table[idx].deleted = true;
        this.count--;
        // 缩容
        if (this.size > 16 && this.count / this.size < 0.2) {
          this._resize(Math.floor(this.size / 2));
        }
        return true;
      }
      idx = (idx + 1) % this.size;
      if (idx === startIdx) break;
    }
    return false; // 未找到
  }

  // 扩容或缩容哈希表
  _resize(newSize) {
    const oldTable = this.table;
    this.size = newSize;
    this.table = new Array(newSize);
    this.count = 0;
    // 重新插入所有未被删除的元素
    for (const entry of oldTable) {
      if (entry && !entry.deleted) {
        this.put(entry.key, entry.value);
      }
    }
  }
}

// 示例用法
const ht = new OpenAddressingHashTable();
ht.put('apple', 1);
ht.put('banana', 2);
console.log(ht.get('apple')); // 1
ht.remove('apple');
console.log(ht.get('apple')); // undefined