fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }
    s
}

fn main() {
    let string = String::from("helow-world");

    println!("first word is: {}", first_word(string.as_str()));
}
