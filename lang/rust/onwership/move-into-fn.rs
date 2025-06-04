fn main() {
    // s1 into scope
    let s1 = String::from("hello");

    // give s1's onwership to takes_and_gives_back
    // s1 died here
    takes_and_gives_back(s1);
}

fn takes_and_gives_back(a: String) {
    let _a = a;
}
