use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

#[derive(Hash, Debug)]
struct MapKey {
    key: String,
}


fn main() {
    let key = MapKey { key: "hello".to_string() };
    let mut hasher = DefaultHasher::new();
    key.hash(&mut hasher);
    let hash_value = hasher.finish();
    println!("Hash value: {:?}", hash_value); // 输出 u64 类型的哈希值
    println!("Hash value (hex): {:X}", hash_value); // 以16进制格式输出哈希值, 并且每两位加一个空格
}