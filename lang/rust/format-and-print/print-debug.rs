fn main() {
  // 使用derive实现Debug trait，对于存在泛型的结构体，要求泛型参数也必需实现Debug trait，否则编译器会报错
  #[derive(Debug)]
  #[allow(dead_code)]
  struct Person<'a> {
    name: &'a str,
    age: u8,
  }

  let name = "Peter";
  let age = 27;
  let peter = Person { name, age };

  println!("{:#?}", peter);
}
