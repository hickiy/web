#![allow(unused)]
fn main() {
    use std::fs::File;
    use std::io;
    use std::io::Read;

    fn read_username_from_file() -> Result<String, io::Error> {
        let mut f = File::open("hello.txt")?;
        let mut s = String::new();
        f.read_to_string(&mut s)?;
        Ok(s)
    }

    if let Ok(s) = read_username_from_file() {
        println!("{}", s)
    } else {
        println!("file not found")
    }
}
/*
C/C++ 和 Go 的嵌套函数支持情况如下：

- C: 不允许在函数内部定义另一个函数（嵌套函数），标准 C 语法不支持。GCC 有扩展支持嵌套函数，但不是标准。
- C++: 同样不允许在函数内部定义另一个函数（嵌套函数）。
- Go: 允许在函数内部定义匿名函数（闭包），但不允许定义具名嵌套函数。

总结：C/C++ 标准不支持嵌套函数，Go 支持匿名嵌套函数（闭包）。
*/
