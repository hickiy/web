fn main() {
  let a = f64::NAN;
  let b = f64::NAN;
  println!("{}", a == b); // false
  println!("{:?}", a.partial_cmp(&b)); // None

  let c = 1;
  let d = 2;
  println!("{}", c == d); // false
  println!("{:?}", c.partial_cmp(&d)); // Some(Less)
}
