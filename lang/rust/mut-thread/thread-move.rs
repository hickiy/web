use std::thread;

fn main() {
  let v = vec![1,2,3];
  let handler = thread::spawn(move || {
    println!("Here is a vector: {:?}", v);
  });
  handler.join().unwrap();
}