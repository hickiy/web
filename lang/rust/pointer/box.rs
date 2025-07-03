use std::mem::size_of_val;

fn main() {
  let a = 5;
  let b = Box::new(5);
  println!("size of a: {}", size_of_val(&a));
  println!("size of b: {}", size_of_val(&b));
  println!("size of value pointed by b (on heap): {}", size_of_val(&*b));
}