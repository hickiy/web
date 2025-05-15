/**
 * JavaScript中的二次探测哈希表实现
 *
 * 二次探测是一种开放寻址哈希表中的冲突解决技术。
 * 当发生冲突时，它以二次递增（i^2）的间隔探测哈希表。
 * 这有助于避免聚集现象，并比线性探测有更好的性能。
 */

class QuadraticProbingHashTable {
  constructor(size = 53) {
    this.table = new Array(size);
    this.size = size;
    this.count = 0;
  }

  // 针对字符串和数字的简单哈希函数
  _hash(key) {
    let hash = 0;
    const strKey = String(key);
    for (let i = 0; i < strKey.length; i++) {
      hash = (hash * 31 + strKey.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  /**
   * 在哈希表中插入或更新一个键值对。
   * 使用二次探测解决冲突。
   */
  set(key, value) {
    let idx = this._hash(key);
    let i = 1;
    while (
      this.table[idx] !== undefined &&
      this.table[idx].key !== key &&
      !this.table[idx].deleted
    ) {
      idx = (this._hash(key) + i * i) % this.size;
      i++;
    }
    this.table[idx] = { key, value, deleted: false };
    this.count++;
  }

  /**
   * 获取与指定键关联的值。
   * 如果插入时发生冲突，则以二次方式探测。
   */
  get(key) {
    let idx = this._hash(key);
    let i = 1;
    while (this.table[idx] !== undefined) {
      if (this.table[idx].key === key && !this.table[idx].deleted) {
        return this.table[idx].value;
      }
      idx = (this._hash(key) + i * i) % this.size;
      i++;
    }
    return undefined;
  }

  /**
   * 从哈希表中移除一个键值对。
   * 标记该槽为已删除，以保持探测序列。
   */
  delete(key) {
    let idx = this._hash(key);
    let i = 1;
    while (this.table[idx] !== undefined) {
      if (this.table[idx].key === key && !this.table[idx].deleted) {
        this.table[idx].deleted = true;
        this.count--;
        return true;
      }
      idx = (this._hash(key) + i * i) % this.size;
      i++;
    }
    return false;
  }
}

// 示例用法：
const ht = new QuadraticProbingHashTable();
ht.set('apple', 1);
ht.set('banana', 2);
console.log(ht.get('apple')); // 1
ht.delete('apple');
console.log(ht.get('apple')); // undefined