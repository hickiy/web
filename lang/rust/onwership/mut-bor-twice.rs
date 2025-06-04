fn main() {
    let mut s = String::from("hello");

    let r1 = &mut s;
    //       ------ first mutable borrow occurs here
    let r2 = &mut s; 
    //       ^^^^^^ second mutable borrow occurs here

    // can't borrow `s` as mutable more than once at a time;
    // if the printer statement is before the declaration of r2
    // then there is no problem
    println!("{}, {}", r1, r2);
}
