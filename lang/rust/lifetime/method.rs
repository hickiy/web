struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn annuounce_and_return_part(&self, annuouncement: &str) -> &str {
        println!("Attention please: {}", annuouncement);
        self.part;
    }
}
