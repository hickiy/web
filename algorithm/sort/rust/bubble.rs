fn bubble_sort(arr: &mut [i32]) {
  let n = arr.len();
  for i in 0..n {
    for j in 0..n - i - 1 {
      if arr[j] > arr[j + 1] {
        arr.swap(j, j + 1);
      }
    }
  }
}

fn main() {
  let mut arr: [i32; 10] = [1, 3, 5, 79, 0, 2, 88, 66, 37, 21];
  bubble_sort(&mut arr);
  println!("{:?}", arr);
}
