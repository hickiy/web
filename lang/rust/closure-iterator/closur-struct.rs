use std::collections::HashMap;
use std::hash;
use std::thread;
use std::time::Duration;

struct Cacher<T, U> {
    calculation: T,
    value: HashMap<U, U>,
}

impl<T, U> Cacher<T, U>
where
    T: Fn(U) -> U,
    U: Eq + hash::Hash + Clone,
{
    fn new(calculation: T) -> Cacher<T, U> {
        Cacher {
            calculation,
            value: HashMap::new(),
        }
    }

    fn value(&mut self, arg: U) -> U {
        self.value
            .entry(arg.clone())
            .or_insert_with(|| (self.calculation)(arg.clone()))
            .clone()
    }
}

fn main() {
    let mut c = Cacher::new(|num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    });

    let v1 = c.value(1);
    println!("the v1 value is: {}", v1);
    let v2 = c.value(1);
    println!("the v2 value is: {}", v2);
}


