fn fibonacci(x: u32) -> i32 {
    let mut last = 0;
    let mut cur = 1;
    for index in 0..=x {
        if index < 3 {
            continue;
        };
        [last, cur] = [cur, last + cur];
    }
    cur + last
}

fn main() {
    for i in 1..=5 {
        let fib = fibonacci(i);
        println!("fibonacci of th {} is: {}", i, fib);
    }
}
