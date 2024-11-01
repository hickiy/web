fn main() {
  let a = f64::NAN;
  let b = f64::NAN;
  println!("{}", a == b); // false
  println!("{:?}", a.partial_cmp(&b)); // None
}
