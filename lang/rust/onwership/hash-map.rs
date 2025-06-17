use std::collections::HashMap;

fn main() {
    let mut o = HashMap::new();
    let s = String::from("key");
    let v = 12;

    o.insert(s, v); // s is moved here

    println!("the value of s is: {}", s); // so it can't be used here
}
