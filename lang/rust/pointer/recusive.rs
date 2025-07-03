enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));

    fn print_list(list: &List) {
        match list {
            Cons(val, next) => {
                println!("{}", val);
                print_list(next);
            }
            Nil => {}
        }
    }

    print_list(&list);
    
    println!("the size of list is: {}", std::mem::size_of_val(&list));
}
