#![allow(unused_variables)]
fn main() {
  // 带后缀的字面量，其类型在初始化时已经知道了。
  let x = 1u8;
  let y = 2u32;
  let z = 3f32;

  // 无后缀的字面量，其类型取决于如何使用它们。
  let i = 1;
  let f = 1.0;

  // `size_of_val` 返回一个变量所占的字节数
  // println!("size of `x` in bytes: {}", std::mem::size_of_val(&x));
  // println!("size of `y` in bytes: {}", std::mem::size_of_val(&y));
  // println!("size of `z` in bytes: {}", std::mem::size_of_val(&z));
  // println!("size of `i` in bytes: {}", std::mem::size_of_val(&i));
  // println!("size of `f` in bytes: {}", std::mem::size_of_val(&f));

  // 进制的数字字面量
  let g = 0xf;
  let h = 0o17;
  let j = 0b10;

  // 带分割符的数字字面量
  let k = 1_000;
  let l = 0b1000_0001;

  // chr 字面量
  let chr = 'A';

  // 字符串字面量
  let str = "Hello, world!";

  // 字符串中的转义字符
  let str_with_escape = "Hello, \nworld!";
  // 字符串中的unicode字符
  let str_with_unicode = "Hello, \u{1F600}!";
  // 字符串中的原始字符串
  let raw_str = r"Hello, \nworld!";

  // bool 字面量
  let is_true = true;

  // byte 字面量
  let byte = b'A';

  // byte array 字面量
  let ascii = b"Hello, world!";

  // byte array 原始字符串
  let raw_ascii = br"Hello, \nworld!";

  // 字符串字面量中的转义字符打印的是其十进制码点对应的字符
  let str_with_escape = "Hello \nworld!";
  let str_with_ascii = "Hello \x7eworld!";
  let str_raw = r"Hello \nworld!";
  println!("\n{}\n{}\n{}", str_with_escape, str_with_ascii, str_raw);
}
