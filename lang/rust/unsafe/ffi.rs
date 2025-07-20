extern "C" {
    fn abs(x: i32) -> i32;
}

fn main() {
    let x = -1;
    unsafe {
        println!("the abs value of x is: {}", abs(x));
    }
}
