fn get_pig_latin(s: &str) -> String {
    let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

    let words: Vec<String> = s
        .split_whitespace()
        .map(|word| {
            if let Some(first_char) = word.chars().next() {
                if vowels.contains(&first_char) {
                    format!("{}-hay", word)
                } else {
                    let rest = &word[first_char.len_utf8()..];
                    format!("{}-{}ay", rest, first_char)
                }
            } else {
                word.to_string()
            }
        })
        .collect();
    words.join(" ")
}

fn main() {
    let s = String::from("hello world and I love apple");
    let s_pig_latin = get_pig_latin(&s);
    println!("{}", s_pig_latin);
}
