struct Point {
  x: i32,
  y: i32,
}

const P: Point = Point { x: 0, y: 0 };

fn main() {
  let Point { x: ref ref_x, y: ref ref_y } = P;
  println!("{} {}", ref_x, ref_y);
}