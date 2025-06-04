fn main() {
    let number = 3;

    // there is no implicity type covert

    // if number {
    //   ^^^^^^ expected `bool`, found integer
    //   println!("number was three");
    // }

    // shoud aways use boolean value or boolean expression where the boolean exprese required;
    // like this

    if number != 1 {
      println!("number was something other than zero");
    }
}
