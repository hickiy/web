fn main() {
    let s1 = String::from("hello");

    // s1 died here
    let mut s2 = s1;

    s2.push_str(", world");

    println!("{}", s2);
    // s2 is droped here
}
