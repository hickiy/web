fn insert_sort(arr: &mut [i32; 10]) {
  for i in 1..arr.len() {
    let mut j = i;
    while j > 0 && arr[j] < arr[j - 1] {
      arr.swap(j, j - 1);
      j -= 1;
    }
  }
}

fn main() {
  let mut arr: [i32; 10] = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21];
  insert_sort(&mut arr);
  println!("{:?}", arr);
}
