#![allow(dead_code)]
use std::fmt;

fn matrix() {
  struct Matrix(f32, f32, f32, f32);
  impl fmt::Display for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
      write!(f, "({}, {})\n({}, {})", self.0, self.1, self.2, self.3)
    }
  }
  let mut matrix = Matrix(1.1, 1.2, 2.1, 2.2);

  fn transpose(m: &mut Matrix) {
    let tmp = m.1;
    m.1 = m.2;
    m.2 = tmp;
  }

  println!("Matrix:\n{}", matrix);
  transpose(&mut matrix);
  println!("Transpose:\n{}", matrix);
}

fn rectangle() {
  struct Rectangle {
    width: u32,
    height: u32,
  }
  impl Rectangle {
    fn rect_area(&self) -> u32 {
      let Rectangle { width, height } = self;
      width * height
    }
  }
  let rect = Rectangle { width: 30, height: 50 };
  println!("Area of rectangle: {}cm\u{00B2}", rect.rect_area());

  struct Point {
    x: u32,
    y: u32,
  }
  fn square(o: Point, s: u32) -> Rectangle {
    let Point { x, y } = o;
    Rectangle { width: x + s, height: y + s }
  }
  let origin = Point { x: 0, y: 0 };
  let square = square(origin, 30);
  println!("Area of square: {}cm\u{00B2}", square.rect_area());
}

#[allow(dead_code)]
fn main() {
  // matrix();
  rectangle();
}
