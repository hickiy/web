fn main() {
    let some_u8_value = Some(0_u8);

    match some_u8_value {
        Some(3) => println!("it matched"),
        _ => println!("it doesn't match"),
    }

    // this is equivalent to above expression

    return if let Some(3) = some_u8_value {
        println!("it matched");
    } else {
        println!("it doesn't match")
    }
}
