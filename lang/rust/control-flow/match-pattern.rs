#![allow(dead_code, unused_variables)]
fn main() {
    fn pattern_one() {
        let x = 1;
        match 1 {
            1 => println!("one"),
            2 => println!("two"),
            3 => println!("three"),
            _ => println!("anything"),
        }
    }
    pattern_one();

    fn pattern_two() {
        let x = Some(5);
        let y = 10;

        match x {
            Some(50) => println!("Got 50"),
            Some(y) => println!("Matched, y={:?}", y),
            _ => println!("Default case x = {:?}", x),
        }

        println!("At the end: x = {:?}, y = {:?}", x, y);
    }
    pattern_two();

    fn pattern_three() {
        let x = 1;
        match x {
            1 | 2 => println!("one or two"),
            3 => println!("three"),
            _ => println!("anything"),
        }
    }
    pattern_three();

    fn pattern_four() {
        let x = 5;
        match x {
            1..=5 => println!("one through five"),
            _ => println!("something else"),
        }
    }
    pattern_four();

    fn pattern_five() {
        let x = 'c';
        match x {
            'a'..='j' => println!("early ASCLL letter"),
            'k'..='z' => println!("late ASCLL letter"),
            _ => println!("something else"),
        }
    }
    pattern_five();

    fn pattern_six() {
        struct Point {
            x: i32,
            y: i32,
        }
        let p = Point { x: 0, y: 7 };
        let Point { x: a, y: b } = p;
        let Point { x, y } = p;
        println!("the value of a is: {}, and the value of b is: {}", a, b);
        println!("the value of x is: {}, and the value of y is: {}", a, b);
    }
    pattern_six();

    fn pattern_seven() {
        struct Point {
            x: i32,
            y: i32,
        }
        let p = Point { x: 0, y: 7 };
        match p {
            Point { x, y: 0 } => println!("On the x axis at {}", x),
            Point { x: 0, y } => println!("On the y axis at {}", y),
            Point { x, y } => println!("On neither axis: ({}, {})", x, y),
        }
    }
    pattern_seven();

    fn pattern_eight() {
        enum Message {
            Quit,
            Move { x: i32, y: i32 },
            Write(String),
            ChangeColor(i32, i32, i32),
        }
        let msg = Message::ChangeColor(0, 160, 255);

        match msg {
            Message::Quit => {
                println!("The Quit variant has no data to destructure");
            }
            Message::Move { x, y } => {
                println!("Move in the x direction {} an in the y direction {}", x, y);
            }
            Message::Write(text) => println!("Text message: {}", text),
            Message::ChangeColor(r, g, b) => {
                println!("Change the color to red {}, green {}, and blue {}", r, g, b);
            }
        }
    }
    pattern_eight();

    fn pattern_nine() {
        enum Color {
            Rgb(i32, i32, i32),
            Hsv(i32, i32, i32),
        }
        enum Message {
            Quit,
            Move { x: i32, y: i32 },
            Write(String),
            ChangeColor(Color),
        }

        let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));

        match msg {
            Message::ChangeColor(Color::Rgb(r, g, b)) => {
                println!("Change the color to red {}, green {}, and blue {}", r, g, b);
            }
            Message::ChangeColor(Color::Hsv(h, s, v)) => {
                println!(
                    "Change the color to hue {}, saturation {}, and value {}",
                    h, s, v
                );
            }
            _ => (),
        }
    }
    pattern_nine();

    fn pattern_ten() {
        struct Point {
            x: i32,
            y: i32,
        }
        let ((feet, inches), Point { x, y }) = ((3, 10), Point { x: 3, y: 10 });
    }
    pattern_ten();

    fn pattern_eleven(_: i32, y: i32) {
        println!("This code only use the y parameter: {}", y);
    }
    pattern_eleven(3, 4);

    fn pattern_twelve() {
        let mut setting_value = Some(5);
        let new_setting_value = Some(10);
        match (setting_value, new_setting_value) {
            (Some(_), Some(_)) => {
                println!("Can't overwrite an existing customized value");
            }
            _ => {
                setting_value = new_setting_value;
            }
        }
        println!("setting is {:?}", setting_value);
    }
    pattern_twelve();

    fn pattern_thirteen() {
        let numbers = (2, 4, 8, 16, 32);
        match numbers {
            (first, _, third, _, fifth) => {
                println!("Some numbers: {}, {}, {}", first, third, fifth);
            }
        }
    }
    pattern_thirteen();

    fn pattern_fourteen() {
        struct Point {
            x: i32,
            y: i32,
            z: i32,
        }
        let origin = Point { x: 0, y: 0, z: 0 };
        match origin {
            Point { x, .. } => {
                println!("x is {}", x);
            }
        }

        let numbers = (2, 4, 8, 16, 32);
        match numbers {
            (first, .., last) => {
                println!("Some numbers: {}, {}", first, last);
            }
        }
    }
    pattern_fourteen();
}
