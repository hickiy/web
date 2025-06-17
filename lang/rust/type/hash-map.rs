use std::collections::HashMap;
use std::mem;

fn main() {
    println!("HashMap<String, i32> 元数据大小分析：");
    println!("===========================================");
    
    // HashMap 本身的大小（元数据）
    println!("HashMap<String, i32> 的大小: {} 字节", mem::size_of::<HashMap<String, i32>>());
    
    // 相关类型的大小
    println!("String 的大小: {} 字节", mem::size_of::<String>());
    println!("i32 的大小: {} 字节", mem::size_of::<i32>());
    println!("usize 的大小: {} 字节", mem::size_of::<usize>());
    println!("*const u8 的大小: {} 字节", mem::size_of::<*const u8>());
    
    println!("\nHashMap 内部结构分析：");
    println!("===========================================");
    
    // HashMap 的内部结构大致包含：
    // 1. 哈希表指针 (ptr) - 8 字节
    // 2. 容量 (capacity) - 8 字节  
    // 3. 长度 (length) - 8 字节
    // 4. 哈希构建器 (hasher) - 24 字节（RandomState）
    // 总计：48 字节
    
    println!("1. 哈希表数据指针: ~8 字节 (64位系统)");
    println!("2. 容量字段: ~8 字节 (usize)");
    println!("3. 长度字段: ~8 字节 (usize)");
    println!("4. 哈希构建器 (RandomState): ~24 字节");
    println!("总计: 48 字节");

    let mut map = HashMap::new();
    println!("\n空 HashMap 的实际大小: {} 字节", mem::size_of_val(&map));
    
    map.insert(String::from("blue"), 10);
    map.insert(String::from("yellow"), 50);
    
    println!("填充数据后 HashMap 元数据大小: {} 字节", mem::size_of_val(&map));
    println!("注意：这只是 HashMap 结构体本身的大小，不包括堆上分配的数据");
    
    // 演示 HashMap 内部数据是在堆上
    println!("\nHashMap 容量信息：");
    println!("当前长度: {}", map.len());
    println!("当前容量: {}", map.capacity());
    
    // 计算实际堆内存使用
    let entry_size = mem::size_of::<(String, i32)>();
    println!("\n每个条目 (String, i32) 的大小: {} 字节", entry_size);
    println!("实际的字符串数据存储在堆上，HashMap 只存储指向它们的指针");
}
