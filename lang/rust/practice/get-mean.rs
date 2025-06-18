use std::collections::HashMap;

fn get_average<T>(slice: &[T]) -> Option<f64>
where
    T: Copy + Into<f64>,
{
    if slice.is_empty() {
        return None;
    }

    let sum: f64 = slice.iter().map(|&x| x.into()).sum();
    let count = slice.len() as f64;

    Some(sum / count)
}

fn get_median<T>(slice: &[T]) -> Option<T>
where
    T: Copy + Ord,
{
    if slice.is_empty() {
        return None;
    }

    let count = slice.len() as u32;
    let midum_index = (count / 2) as usize;

    let mut shadow_slice: Vec<&T> = slice.iter().collect();
    shadow_slice.sort_by(|a, b| a.cmp(b));

    Some(*shadow_slice[midum_index])
}

fn get_mode<T>(slice: &[T]) -> Option<T>
where
    T: Copy,
    T: std::hash::Hash + Eq,
{
    if slice.is_empty() {
        return None;
    }

    let mut map: HashMap<T, usize> = HashMap::new();
    let mut mode = slice[0];
    let mut max_count = 0;

    for &num in slice {
        let count = map.entry(num).or_insert(0);
        *count += 1;
        if *count > max_count {
            max_count = *count;
            mode = num;
        }
    }
    Some(mode)
}

fn main() {
    let v = vec![1, 3, 2, 4, 6, 7, 9, 3, 3];
    if let Some(avreage) = get_average::<i32>(&v[..]) {
        println!("the mean avreage value is: {:.2}", avreage);
    }

    if let Some(median) = get_median::<i32>(&v[..]) {
        println!("the median value is: {}", median);
    }

    if let Some(mode) = get_mode::<i32>(&v[..]) {
        println!("the mode value is: {}", mode);
    }
}
