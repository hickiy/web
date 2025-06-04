fn main() {
    // reference_to_nothing is a dangling pointer
    let reference_to_nothing = dangle();

    // missing lifetime specifier 
}

fn dangle() -> &String {
    //         ^ expected named lifetime parameter
    let s = String::from("hello");
    // return a reference
    &s 
    // `s` is droped here
}
