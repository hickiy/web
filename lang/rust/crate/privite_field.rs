mod back_of_hose {
    pub struct Breakfast {
        // all the fields is privite by default, you can add pub keyword to publish a field.
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }

    #[derive(Debug)]
    pub enum Appetizer {
        // all the varients is public by default
        Soup,
        Salad,
    }
}

fn main() {
    let mut meal = back_of_hose::Breakfast::summer("Rye");
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast please", meal.toast);

    // meal.seasonal_fruit = String::from("blueberries");

    // println!("I'd like {} fruit please", meal.seasonal_fruit);

    let order1 = back_of_hose::Appetizer::Soup;
    let order2 = back_of_hose::Appetizer::Salad;

    println!("{:?} {:?}", order1, order2);
}
