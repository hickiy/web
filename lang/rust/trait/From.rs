use std::fmt::*;
use std::convert::From;

struct MyChar(char);

impl Binary for MyChar {
  fn fmt(&self, f: &mut Formatter) -> Result {
    write!(f, "{:032b}", self.0 as u32)
  }
}

impl From<char> for MyChar {
  fn from(c: char) -> MyChar {
    MyChar(c)
  }
}

fn main() {
  let decimal = 65.4321_f32;
  let integer: u8 = decimal as u8;
  let character = integer as char;
  let my_char = MyChar::from(character);
  println!("\nCasting: {} -> {} -> {} -> {:b}", decimal, integer, character, my_char);
}
