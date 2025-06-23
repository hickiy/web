use std::fmt::Display;
impl<T: Display> ToString for T {
    fn to_string(&self) {
        //......
    }
}
