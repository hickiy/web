fn main() {
  let x = 10;

  // 自动借用 x
  let closure = || println!("{}", x);

  // 手动借用x
  let _y = &x;

  closure();
}