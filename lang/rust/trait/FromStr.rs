struct Person {
  name: String,
  age: i32,
}

impl std::str::FromStr for Person {
  type Err = ();
  fn from_str<>(s: &str) -> Result<Self, Self::Err> {
    let parts: Vec<&str> = s.split(",").collect();
    if parts.len() != 2 {
      return Err(());
    }

    let name = parts[0].trim();
    let age = match parts[1].trim().parse() {
      Ok(age) => age,
      Err(_) => {
        return Err(());
      }
    };

    Ok(Person { name: name.to_string(), age: age })
  }
}

impl std::fmt::Display for Person {
  fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
    write!(f, "{} is {} years old", self.name, self.age)
  }
}

fn main() {
  // 声明类型的parse转换
  let parsed: i32 = "5".parse().unwrap();
  // 使用turbofish语法
  let turbo_parsed = "10".parse::<i32>().unwrap();
  // 相同类型可以直接相加
  let sum = parsed + turbo_parsed;
  // 打印结果
  println!("Sum: {}", sum);

  // 将一个字符串转换为Person类型
  let p = "John, 42".parse::<Person>().unwrap();
  // 打印结果
  println!("Person: {}", p);
}
