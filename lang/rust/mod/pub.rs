mod front_of_huse {
   pub mod hosting {
        pub fn add_to_waitlist() {
          println!("nested fn")
        }
    }
}

fn main() {
    front_of_huse::hosting::add_to_waitlist();
}
