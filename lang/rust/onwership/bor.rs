fn main() {
    let s1 = String::from("hello");

    let len = calculate_lenght(&s1);

    println!("The length of {} is {}.", s1, len);
}

fn calculate_lenght(a: &str) -> usize {
    // a is a reference from a string
    a.len()
    // a died here
    // because a is a reference, so it won't be dorp anything
}
