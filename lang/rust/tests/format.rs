fn main() {}
pub fn greeting(_name: &str) -> String {
    // format!("Hello {}!", name)
    String::from("Hello")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(
            result.contains("Carol"),
            "Creeting did not contain name, value was: {}",
            result
        );
    }
}
