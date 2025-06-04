fn main() {
    let condition = true;

    let x = if condition { 5 } else { "six" };
    //                                ^^^^^ expected integer, found `&str`
    //                     |
    //                     expected because of this
    
    println!("the value of x is: {}", x);
}
