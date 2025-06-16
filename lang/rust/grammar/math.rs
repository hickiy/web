fn main() {
  // addition
  let sum = 5 + 10;

  // subtraction
  let difference = 95.5 - 4.3;

  // multiplication
  let product = 4 * 30;

  // division
  let quotient = 56.7 / 32.2;
  let floored = 2 / 3; // 0.66666... the dividion operation result is a integer value, so it's will be floored

  // remainder
  let remainder = 257 % 2_i32.pow(8);
  println!("The sum value is: {}", sum);
  println!("The difference value is: {}", difference);
  println!("The product value is: {}", product);
  println!("The quotient value is: {}", quotient);
  println!("The floored value is: {}", floored);
  println!("The remainder value is: {}", remainder);
} 