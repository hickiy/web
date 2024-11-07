use std::fmt; // 导入 `fmt`

// 为了比较，定义一个含有具名字段的结构体。
#[derive(Debug)]
struct Complex  {
  real: f64,
  imag: f64,
}

// 对 `Complex` 实现 `Display`
impl fmt::Display for Complex  {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // 自定义格式，使得仅显示 `x` 和 `y` 的值。
        write!(f, "{} + {}", self.real, self.imag)
    }
}

// 对 `Complex` 实现 `Binary`
impl fmt::Binary for Complex  {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // 自定义格式，使得仅显示 `x` 和 `y` 的值。
        write!(f, "{:b} + {:b}", self.real as i64, self.imag as i64)
    }
}

// 对一个复杂结构体实现display
struct List(Vec<i32>);
impl fmt::Display for List {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let vec = &self.0;
        write!(f, "[")?;
        for (index, v) in vec.iter().enumerate() {
            if index != 0 { write!(f, ", ")?; }
            write!(f, "{}: {}", index, v)?;
        }
        write!(f, "]")
    }
}

fn main() {
    let complex  = Complex { real: 3.3, imag: 7.2 };
    let l = List(vec![1, 2, 3]);
    println!("Compare points:");
    println!("Display: {}", complex);
    println!("Debug: {:?}", complex);
    println!("Binary: {:b}", complex);
    println!("Display: {}", l);
}
