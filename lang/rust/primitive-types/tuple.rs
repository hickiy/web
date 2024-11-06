fn main() {
  let tup = (500, 6.4, 1);

  let (_x, y, _z) = tup; // Destructuring

  println!("The value of y is: {}", y);
  println!("The value of tup.0 is: {}", tup.0); // Accessing by index
}


