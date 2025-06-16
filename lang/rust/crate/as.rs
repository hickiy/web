mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {
            println!("nested funtion")
        }
    }
}

use front_of_house::hosting::add_to_waitlist as add_to_waitlist_shadow;

fn main() {
    add_to_waitlist_shadow();
}
