fn main() {
    let mut s = String::from("hello");

    change(&mut s);

    println!("the value of s is: {}", s);
}

fn change(some_str: &mut String) {
    some_str.push_str(", world");
}
