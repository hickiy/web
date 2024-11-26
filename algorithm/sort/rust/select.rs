fn slect_sort(arr: &mut [i32; 10]) {
  for i in 0..arr.len() {
    let mut minimum = i;
    for j in i..arr.len() {
      if arr[j] < arr[minimum] {
        minimum = j;
      }
    }
    arr.swap(i, minimum);
  }
}

fn main() {
  let mut arr: [i32; 10] = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21];
  slect_sort(&mut arr);
  println!("{:?}", arr);
}
