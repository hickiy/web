fn converte_to_fahrenheit(x: f64) -> f64 {
    x / 5.0 * 9.0 + 32.0
}

fn converte_to_centigrade(x: f64) -> f64 {
    (x - 32.0) / 9.0 * 5.0
}

fn main() {
    let f = converte_to_fahrenheit(100.0);
    println!("100 \u{2103} equal {} \u{2109}", f);
    let c = converte_to_centigrade(212.0);
    println!("212 \u{2109} equal {} \u{2103}", c);
}
