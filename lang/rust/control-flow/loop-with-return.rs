fn main() {
    let mut counter = 0;

    let result = 'counter_up: loop {
        counter += 1;

        if counter == 10 {
            break 'counter_up counter * 2;
        }
    };

    println!("The result is: {}", result);
}
