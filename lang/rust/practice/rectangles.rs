#[derive(Debug)]
struct Rectangle {
  white: u32,
  height: u32
}

impl Rectangle {
  fn area(&self) -> u32 {
    self.white * self.height
  }
  fn can_hold(&self, other: &Rectangle) -> bool {
    self.white >= other.white && self.height >= other.height
  }
  fn square(size: u32) -> Rectangle {
    Rectangle {
      white: size,
      height: size
    }
  }
}

fn main() {
  let rect1 = Rectangle::square(30);
  let rect2 = Rectangle::square(20);

  println!("show the rect1 {:#?}", rect1);
  println!("the size of rect1 is: {}", rect1.area());
  println!("does rect1 can hold rect2?, the result is: {}", rect1.can_hold(&rect2));
}