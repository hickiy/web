fn main() {
    let mut v = vec![1, 2, 3];
    for i in &mut v {
        *i += 50;
    }
    println!("the value of v is: {:#?}", v);
}
