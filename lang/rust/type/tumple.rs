fn main() {
    // tuple is assigned at the stack memory;
    let tup: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = tup.0;

    println!("the value of five_handred is: {}", five_hundred);

    let (_, y, _) = tup;

    println!("The value of y is: {}", y);
}
