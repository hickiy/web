fn serve_order() {
    println!("cook_order");
}

pub mod front_of_huse {
    pub fn fix_incorrect_order() {
        super::serve_order();
    }
}

fn main() {
    front_of_huse::fix_incorrect_order();
}
