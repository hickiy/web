#![allow(dead_code, unused_variables)]
fn main() {
    fn pattern_noe() {
        let num = Some(4);
        match num {
            Some(x) if x < 5 => {
                println!("less then five: {}", x);
            }
            Some(x) => {
                println!("{}", x)
            }
            None => (),
        }
    }
    pattern_noe();

    fn pattern_two() {
        let x = Some(5);
        let y = 10;
        match x {
            Some(50) => println!("Got 50"),
            Some(n) if n == y => {
                println!("Matched: n = {}", n);
            }
            _ => println!("Default case: x = {:?}", x),
        }
        println!("at the end: x = {:?}, y = {}", x, y);
    }
    pattern_two();

    fn pattern_three() {
        let x = 4;
        let y = false;

        match x {
            4 | 5 | 6 if y => {
                println!("yes");
            }
            _ => println!("no"),
        }
    }
    pattern_three();

    fn pattern_four() {
        enum Message {
            Hello { id: i32 },
        }
        let msg = Message::Hello { id: 5 };
        match msg {
            Message::Hello {
                id: id_variable @ 3..=7,
            } => {
                println!("Found an id in range: {}", id_variable);
            }
            Message::Hello { id: 10..=12 } => {
                println!("Found an id in other range");
            }
            Message::Hello { id } => {
                println!("Found some other id: {}", id);
            }
        }
    }
    pattern_four();
}
