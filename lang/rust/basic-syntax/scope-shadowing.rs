#![allow(unused_variables)]
fn scope_shadowing() {
  // 此绑定生存于 main 函数中
  let long_lived_binding = 3;
  // 这是一个代码块，比 main 函数拥有更小的作用域
  {
    let long_lived_binding = 4;
    println!("inner long: {}", long_lived_binding);
  }
}

fn main() {
  scope_shadowing();
}
