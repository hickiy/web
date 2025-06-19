mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {
            println!("nested funtion")
        }
    }
}

use crate::front_of_house::hosting;

fn main() {
    hosting::add_to_waitlist();
}
