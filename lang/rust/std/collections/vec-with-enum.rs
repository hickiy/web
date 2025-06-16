use std::fmt;

// #[derive(Debug)]
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

impl fmt::Display for SpreadsheetCell {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            SpreadsheetCell::Int(i) => {
                let s = format!("Int({}), ", i);
                f.write_str(&s)
            }
            SpreadsheetCell::Float(fl) => {
                let s = format!("Float({}), ", fl);
                f.write_str(&s)
            }
            SpreadsheetCell::Text(s) => {
                let mut out = String::from("Text(\"");
                out.push_str(s);
                out.push_str("\"), ");
                f.write_str(&out)
            }
        }
    }
}

fn main() {
    let row = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Float(10.12),
        SpreadsheetCell::Text(String::from("blue")),
    ];

    for i in row {
        println!("{}", i)
    }
}
