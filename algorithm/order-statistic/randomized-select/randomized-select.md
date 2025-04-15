## 随机选择算法（Randomized-Select）形式化描述

随机选择算法用于在无序数组中查找第 $i$ 小的元素（即顺序统计量）。其基本思想类似于快速排序，通过随机划分数组来递归地缩小查找范围。

### 输入

- 数组 $A[1 \ldots n]$
- 整数 $i$，表示要查找的第 $i$ 小元素

### 输出

- $A$ 中第 $i$ 小的元素

### 伪代码

```text
RANDOMIZED-SELECT(A, p, r, i)
1. if p == r
2.     return A[p]
3. q = RANDOMIZED-PARTITION(A, p, r)
4. k = q - p + 1
5. if i == k
6.     return A[q]
7. else if i < k
8.     return RANDOMIZED-SELECT(A, p, q - 1, i)
9. else
10.    return RANDOMIZED-SELECT(A, q + 1, r, i - k)
```

### 辅助函数

```text
RANDOMIZED-PARTITION(A, p, r)
1. i = RANDOM(p, r)
2. exchange A[r] with A[i]
3. return PARTITION(A, p, r)
```

### 说明

- `RANDOM(p, r)` 随机生成 $p$ 到 $r$ 之间的整数。
- `PARTITION` 函数与快速排序中的分区操作相同。
- 算法的期望时间复杂度为 $O(n)$。
