#[derive(Debug)]
struct Pair(Box<i32>, Box<i32>);

impl Pair {
  fn destroy(&self) {
    let Pair(first, second) = self;
    println!("Destroying Pair({}, {})", first, second);
  }
}

fn main() {
  let pair = Pair(Box::new(1), Box::new(2));
  pair.destroy();
  println!("pair is: {:?}", pair);
}
