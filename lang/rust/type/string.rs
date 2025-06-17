fn main() {
    let hello = "Здравствуйте";
    println!("the len of hello is: {}", hello.len());

    for c in hello.chars() {
      println!("{}", c);
    }
}
