fn main() {
  let array1 = [1, 2, 3];
  let array2 = [4, 5, 6];
  // 对 vec 的 `iter()` 举出 `&i32`。（通过用 `&x` 匹配）把它解构成 `i32`。
  // 译注：注意 `any` 方法会自动地把 `vec.iter()` 举出的迭代器的元素一个个地
  // 传给闭包。因此闭包接收到的参数是 `&i32` 类型的。
  println!(
    "2 in vec1: {}",
    array1.iter().any(|&x| x == 2)
  );
  // 对 vec 的 `into_iter()` 举出 `i32` 类型。无需解构。
  println!(
    "2 in vec2: {}",
    array2.into_iter().any(|x| x == 2)
  );
  println!("is live: {:?}", array1);
  println!("is live: {:?}", array2);
}
