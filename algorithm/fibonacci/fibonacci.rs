use std::time::Instant;

fn fibonacci(n: u32) -> u32 {
    if n < 3 {
        return 1;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}

fn main() {
    let n = 40;
    let start = Instant::now();
    let fortieth_fib = fibonacci(n);
    let duration = start.elapsed();
    println!("第{:?}位斐波那契数是: {:?}", n, fortieth_fib);
    println!("计算耗时: {:?}", duration);
}
