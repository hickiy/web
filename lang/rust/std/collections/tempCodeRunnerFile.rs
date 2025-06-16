impl fmt::Display for SpreadsheetCell {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         match self {
//             SpreadsheetCell::Int(i) => {
//                 let s = format!("Int({}), ", i);
//                 f.write_str(&s)
//             }
//             SpreadsheetCell::Float(fl) => {
//                 let s = format!("Float({}), ", fl);
//                 f.write_str(&s)
//             }
//             SpreadsheetCell::Text(s) => {
//                 let mut out = String::from("Text(\"");
//                 out.push_str(s);
//                 out.push_str("\"), ");
//                 f.write_str(&out)
//             }
//         }
//     }
// }