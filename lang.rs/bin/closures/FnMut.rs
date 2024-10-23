fn main() {
  let mut x = 4;

  let mut equal_to_x = || {
    x += 1;
    println!("x: {}", x);
  };
  equal_to_x();
  equal_to_x();
}
