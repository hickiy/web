enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl Message {
    fn call(&self) {
        match self {
            Message::Quit => println!("Quit"),
            Message::Move { x, y } => println!("Move to x: {}, y: {}", x, y),
            Message::Write(text) => println!("Write: {}", text),
            Message::ChangeColor(r, g, b) => println!("Change color to rgb({}, {}, {})", r, g, b),
        }
    }
}

fn main() {
    let q = Message::Quit;
    q.call();
    let m = Message::Move { x: 10, y: 9 };
    m.call();
    let w = Message::Write(String::from("hello"));
    w.call();
    let c = Message::ChangeColor(255, 255, 255);
    c.call();
}
