fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    //       -- immutable borrow occurs here
    let r2 = &s;
    let r3 = &mut s;
    //       -- immutable borrow later used here


    // can't borrow `s` as mutable because it is also borrowed as immutable
    println!("{}, {}, {}", r1, r2, r3);
}
