// 对于所有字段都实现了Copy trait的struct，才能自动实现Copy trait
// 一旦实现了Copy trait，那么在赋值时，会发生复制，而不是所有权转移
// 即使所有的字段都实现了Copy trait，rust也不会自动实现Copy trait
// 想要实现Copy trait，必须先实现Clone trait
#[derive(Copy, Clone)]
struct Point {
  x: i32,
  y: i32,
}

fn main() {
  let p1 = Point { x: 1, y: 2 };
  println!("p1: ({}, {})", p1.x, p1.y);
  let p2 = p1; // 这里发生了复制，而不是所有权转移
  println!("p2: ({}, {})", p2.x, p2.y);
  let p3 = &p1; // 这里发生了借用，而没有进行复制
  println!("p3: ({}, {})", p3.x, p3.y);
}
