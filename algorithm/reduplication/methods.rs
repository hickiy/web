// fn splice(arr: &mut Vec<i32>) {
//   let mut i = 0;
//   while i < arr.len() {
//     if
//       let Some(dup_index) = arr
//         .iter()
//         .skip(i + 1)
//         .position(|&x| x == arr[i])
//     {
//       arr.remove(i + dup_index + 1);
//     } else {
//       i += 1;
//     }
//   }
// }

fn splice(arr: &mut Vec<i32>) {
  let mut i = 0;
  while i < arr.len() {
    if let Some((dup_index, _)) = arr
      .iter()
      .enumerate()
      .skip(i + 1)
      .find(|&(_, &x)| x == arr[i])
    {
      arr.remove(dup_index);
    } else {
      i += 1;
    }
  }
}

fn main() {
  let mut arr = vec![1, 2, 3, 2, 4, 3, 5];
  splice(&mut arr);
  println!("{:?}", arr); // 输出: [1, 2, 3, 4, 5]
}