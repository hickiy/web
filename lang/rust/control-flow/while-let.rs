fn main() {
    let mut stack = vec![];
    stack.push(1);
    stack.push(2);
    stack.push(3);

    while let Some(top) = stack.pop() {
        println!("top is {}", top);
    }
}
