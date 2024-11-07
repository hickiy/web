#![allow(dead_code)]

enum Status {
  Rich,
  Poor,
}

fn destructure_enum() {
  use Status::{ Rich, Poor };
  let status = Rich;
  match status {
    // 注意这里没有用完整路径，因为上面显式地使用了 `use`。
    Rich => println!("The rich have lots of money!"),
    Poor => println!("The poor have no money..."),
  }
}

fn link_list() {
  enum List {
    Cons(u32, Box<List>),
    Nil,
  }
  use List::{ Cons, Nil };

  impl List {
    fn new() -> List {
      Nil
    }
    fn prepend(self, elem: u32) -> List {
      Cons(elem, Box::new(self))
    }
    fn len(&self) -> u32 {
      match *self {
        Cons(_, ref tail) => 1 + tail.len(),
        Nil => 0,
      }
    }
    fn stringify(&self) -> String {
      match *self {
        Cons(head, ref tail) => { format!("{}, {}", head, tail.stringify()) }
        Nil => { format!("Nil") }
      }
    }
  }
  let list = List::new().prepend(1).prepend(2).prepend(3);

  println!("linked list has length: {}", list.len());
  println!("{}", list.stringify());
}

fn main() {
  // destructure_enum();
  link_list();
}
