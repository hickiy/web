fn main() {
    let mut v = vec![1, 2];

    let mut b = &mut v[0];

    *b += 50;

    b = &mut v[1];

    *b +=50;

    println!("{:?}", v);
}
