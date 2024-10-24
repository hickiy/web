fn main() {
    /*
     * 1. 整数类型（如 u8, i32, u64 等）
     * 2. 浮点数类型（如 f32, f64）
     * 3. 字符类型（char）
     * 4. 布尔类型（bool）
     * 5. 元组，当且仅当其包含的类型也都是 Copy 的时候
     * 6. 数组，当且仅当其包含的类型也都是 Copy 的时候
     * 7. 函数指针（如 fn(…) -> …）
     * 8. 引用类型（&T）
     */
    // let x = String::from("hello");
    // let x = 5;
    // let x = char::from('a');
    // let x = true;
    // let x = (1, 2); // 未实现Formatter trait 无法打印
    // let x = [1, 2]; // 未实现Formatter trait 无法打印
    // let x = |x| x + 1; // 未实现Formatter trait 无法打印
    // let x: &str = "hello";

    // 对于一个没有实现Copy的类型，无论是否声明了move，闭包都会捕获所有权，导致闭包只能被调用一次
    // 对于一个实现了Copy的类型，即使声明了move，闭包也会捕获引用，而不是所有权，因此闭包可以被调用多次
    // 这个闭包捕获了 x 的所有权，因此它是 FnOnce

    let consume_x = move || {
        let y = x;
        println!("{}", y);
    };

    // 调用闭包
    consume_x();
    consume_x();
}
