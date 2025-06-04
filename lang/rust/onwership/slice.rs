fn main() {
  let slice = first_word("hello world");
  println!("the value of slice is: {}", slice);
}

fn first_word(s: &str) -> &str {
  let bytes = s.as_bytes();
  for (i, &item) in bytes.iter().enumerate() {
    if item == b' ' {
      return &s[0..i];
    }
  }
  &s[..]
}