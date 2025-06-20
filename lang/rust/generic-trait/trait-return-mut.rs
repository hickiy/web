use std::fmt::Debug;

trait Summary {
    fn summarize_author(&self) -> String;
    fn summarize(&self) -> String {
        format!("Read more from {}...", self.summarize_author())
    }
}

#[derive(Debug)]
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

#[derive(Debug)]
struct Tweet {
    username: String,
    content: String,
    reply: bool,
    retweet: bool,
}

impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

fn main() {
    fn create_article(switch: bool) -> impl Summary + Debug {
        if switch {
            NewsArticle {
                headline: String::from("pengunis win the Stanley Cup Championship!"),
                location: String::from("Pittsburgh, PA, USA"),
                username: String::from("Iceburgh"),
                content: String::from(
                    "he Pittsburgh Penguins once again are the best hockey team in the NHL.",
                ),
            }
        } else {
            Tweet {
                username: String::from("horse_ebooks"),
                content: String::from("of course, as you probably already know, people"),
                reply: false,
                retweet: false,
            }
        }
    }

    fn notify<T>(item: T)
    where
        T: Summary + Debug,
    {
        println!("Breaking news! {}", item.summarize());
    }

    let article = create_article(true);

    notify(article)
}
