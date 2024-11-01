import numpy as np

# 示例矩阵
A = np.array([
    [1, 2],
    [4, 5]
])

B = np.array([
    [7, 8],
    [9, 10],
])

# 使用 @ 运算符进行矩阵乘法
# result = A @ B
# 或者使用 np.dot 函数
# result = np.dot(A, B)
# 自定义函数实现矩阵乘法


def matrix_mut(A, B):
    # 矩阵 A 的行数
    m = len(A)
    # 矩阵 A 的列数
    n = len(A[0])
    # 矩阵 B 的行数
    p = len(B)
    # 矩阵 B 的列数
    q = len(B[0])

    # 创建一个空矩阵
    result = [[0] * q for i in range(m)]

    # 矩阵乘法
    for i in range(m):
        for j in range(q):
            for k in range(n):
                result[i][j] += A[i][k] * B[k][j]

    return result


# 调用自定义函数
result = matrix_mut([
    [1, 2],
    [4, 5]
], [
    [7, 8],
    [9, 10],
])

# 打印结果
print(result)
