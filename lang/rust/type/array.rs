fn main() {
    // fixed-size array is assigned at the stack memory;
    let _a = [1, 2, 3, 4, 5]; // [i32; 5]

    let _months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]; // ['static str; 12]

    let b: [i32; 5] = [3, 3, 3, 3, 3];

    let b_equal = [3; 5];

    // The value of comp is "true", To compare two arrays, compare the value of their corresponding element;

    let comp = b == b_equal;

    println!("does the b eq the b_equal? {}", comp);

    let c = [1, 2, 3, 4, 5];
    let first = c[0];
    let second = c[1];

    println!(
        "The first value is: {},  The second value is: {}",
        first, second
    );
}
