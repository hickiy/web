fn main() {
    let x = 4;

    let equal_to_x = |z| z * x;

    println!("x: {}", equal_to_x(2));
    println!("x: {}", equal_to_x(3));
}
