# 确定性选择算法（Deterministic Select / BFPRT）的形式化描述

给定一个数组 A 和一个整数 k（$1 \leq k \leq n$，n 为 A 中的元素个数），算法目标是求出 A 中第 k 小的数。该算法的核心思想是采用"中位数的中位数"作为划分依据，可以保证最坏情况下线性时间复杂度。定一个数组 A 和一个整数 k（$1 \leq k \leq n$，n 为 A 中的元素个数），算法目标是求出 A 中第 k 小的数。该算法的核心思想是采用"中位数的中位数"作为划分依据，可以保证最坏情况下线性时间复杂度。定性选择算法（Deterministic Select / BFPRT）的形式化描述

给定一个数组 A 和一个整数 k（1 ≤ k ≤ n，n 为 A 中的元素个数），算法目标是求出 A 中第 k 小的数。该算法的核心思想是采用“中位数的中位数”作为划分依据，可以保证最坏情况下线性时间复杂度。

## 算法步骤描述

1. **基本情况：**  
   当数组 A 的规模 n 较小时（例如 $n \leq 5$），直接对 A 进行排序后返回第 k 小的元素。

2. **分组：**  
   将 A 分为 $\lceil n/5 \rceil$ 个子数组，每个子数组最多包含 5 个元素（最后一组可能少于 5 个）。

3. **找出各组中位数：**  
   对每个子数组进行排序，取排序后中间位置的元素作为该组的中位数，所有中位数构成新数组 M。

4. **选择枢轴：**  
   递归地对 M 使用确定性选择算法，找出 M 的中位数作为枢轴 pivot。这个 pivot 能确保良好的划分效果。

5. **划分：**  
   根据枢轴 pivot 将原数组 A 划分成三个部分：  
   - $L = \{ x \in A | x < \text{pivot} \}$
   - $E = \{ x \in A | x = \text{pivot} \}$
   - $G = \{ x \in A | x > \text{pivot} \}$

6. **递归选择：**  
   - 若 $k \leq |L|$，则目标元素位于 L 中，递归求解 SELECT(L, k)。
   - 若 $k > |L| + |E|$，则目标元素位于 G 中，递归求解 SELECT(G, k - |L| - |E|)。
   - 否则，pivot 即为第 k 小的元素，返回 pivot。

## 伪代码

```txt
FUNCTION SELECT(A, k)
  // 基本情况: 当数组较小时，直接排序返回第 k 小元素
  IF length(A) <= 5 THEN
    SORT(A)
    RETURN A[k]
  ENDIF

  // 将 A 分为若干组，每组最多 5 个元素
  DIVIDE A INTO ceil(n/5) GROUPS of 5 elements each

  // 求每组的中位数，并构成数组 M
  M = an empty list
  FOR EACH group G in A DO
    SORT(G)
    m = the median of G
    ADD m to M
  ENDFOR

  // 递归求 M 的中位数作为枢轴
  pivot = SELECT(M, ceil(length(M)/2))

  // 根据 pivot 对 A 进行 partition
  L = { x in A | x smaller than pivot }
  E = { x in A | x equal to pivot }
  G = { x in A | x larger than pivot }

  // 递归选出目标值
  IF k <= length(L) THEN
    RETURN SELECT(L, k)
  ELSEIF k > length(L) + length(E) THEN
    RETURN SELECT(G, k - length(L) - length(E))
  ELSE
    RETURN pivot
  ENDIF
END FUNCTION
```

该伪代码展示了确定性选择算法（BFPRT）的主要流程，其核心在于利用“中位数的中位数”保证每次划分后递归调用的规模能得到有效缩减，从而实现最坏情况下的线性时间复杂度。