# 类型系统 (Types)
- 保证了变量拥有我们期望的形状和行为
- 保证了变量指向的内存是有效的

## 实义类型 （concrete type） 
- 数字类型（numeric type）：`i8`、`i16`、`i32`、`i64`、`i128`、`u8`、`u16`、`u32`、`u64`、`u128`、`f32`、`f64`
- 布尔类型（boolean type）：`bool`
- 字符类型（character type）：`char`
- 字符串类型（string type）：`&str`、`String`
- 数组（array）：`[T; N]`
- 元组（tuple）：`(T1, T2, T3, ...)`
- 指针（pointer）：`*const T`、`*mut T`
- 引用（reference）：`&T`、`&mut T`
- 函数（function）：`fn(T) -> U`
- 切片（slice）：`&[T]`、`&mut [T]`
- 枚举（enum）：`Option<T>`、`Result<T, E>`
- 结构体（struct）：`struct Point { x: i32, y: i32 }`
- 元组结构体（tuple struct）：`struct Color(i32, i32, i32)`
- 单元结构体（unit struct）：`struct Empty`
- 单元类型（unit type）：`()`


## 抽象类型 （abstract type） 通过特性（trait）来定义，可以用于多种具体类型
- 泛型（generic）：`Option<T>`、`Result<T, E>`、`Vec<T>`
- 特型（trait）：`Iterator`、`Future`、`AsyncRead`、`AsyncWrite`
- 特型绑定（trait bound）： `T: Iterator`、`T: Future`、`T: AsyncRead + AsyncWrite`  
- 生命周期 (lifetime): `'a`

