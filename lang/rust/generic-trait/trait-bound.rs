trait Summary {
    fn summarize_author(&self) -> String;
    fn summarize(&self) -> String {
        format!("Read more from {}...", self.summarize_author())
    }
}

struct NewsArticle {
    headline: String,
    location: String,
    username: String,
    content: String,
}

impl Summary for NewsArticle {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}

fn main() {
    let article = NewsArticle {
        headline: String::from("pengunis win the Stanley Cup Championship!"),
        location: String::from("Pittsburgh, PA, USA"),
        username: String::from("Iceburgh"),
        content: String::from(
            "he Pittsburgh Penguins once again are the best hockey team in the NHL.",
        ),
    };

    fn notify<T: Summary>(item: T) {
        println!("Breaking news! {}", item.summarize());
    }

    notify(article)
}
