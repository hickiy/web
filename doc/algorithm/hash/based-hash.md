# 基础 Hash 算法分类与代表实现

Hash（散列）算法广泛应用于哈希表、数据查重、加密等领域。基础 hash 算法主要分为以下几类，每类下有一些经典的实现方式。

---

## 1. 乘法型 Hash 算法

特点：通过不断乘以一个常数（种子/乘数）并加上字符值，生成哈希值。实现简单，分布较均匀。

- **BKDR Hash**  
  公式：`hash = hash * seed + ch`  
  代表实现：[BKDR.js](BKDR.js)  
  常用种子为 31 或 131。

- **SDBM Hash**  
  公式：`hash = hash * 65599 + ch`  
  代表实现：[SDBM.js](SDBM.js)  
  通过移位和加法操作实现高效计算。

- **RS Hash**  
  公式：`hash = hash * a + ch`，a 每轮变化  
  代表实现：[RS.js](RS.js)  
  乘数 a 初始为 63689，每轮乘以 378551。

---

## 2. 位运算型 Hash 算法

特点：大量使用移位、异或等位运算，能有效分散哈希值，减少冲突。

- **ELF Hash**  
  代表实现：[ELF.js](ELF.js)  
  通过移位和掩码操作分散哈希值，常用于 UNIX 系统。

- **AP Hash**  
  代表实现：[AP.js](AP.js)  
  奇偶位采用不同的处理方式，进一步减少冲突。

---

## 3. 加法型 Hash 算法

特点：主要通过加法和简单的移位操作实现，结构简单，速度快。

- **DJB2 Hash**  
  公式：`hash = hash * 33 + ch`  
  代表实现：[DJB2.js](DJB2.js)  
  由 Daniel J. Bernstein 提出，分布性好，广泛应用。

---

## 4. 加密型 Hash 算法

特点：设计用于安全性，抗碰撞能力强，常用于加密、签名等场景。

- **SHA-1（简化版）**  
  代表实现：[hash-1.js](hash-1.js)  
  结构复杂，安全性高，但已不推荐用于安全场景。

---

## 参考

- [BKDR.js](BKDR.js)
- [SDBM.js](SDBM.js)
- [RS.js](RS.js)
- [ELF.js](ELF.js)
- [AP.js](AP.js)
- [DJB2.js](DJB2.js)
- [hash-1.js](hash-1.js)

每种算法都有其适用场景，选择时需根据实际需求权衡速度、分布性和安全性。