enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}", state);
            25
        }
    }
}

fn main() {
    let _penny = Coin::Penny;
    let _nickel = Coin::Nickel;
    let _dime = Coin::Dime;
    let _quarter = Coin::Quarter(UsState::Alabama);
    let quarter = Coin::Quarter(UsState::Alaska);
    
    let size_of_quarter = std::mem::size_of_val(&quarter);
    println!("the size of quarter is: {}", size_of_quarter);

    let value = value_in_cents(quarter);
    println!("the coin value is: {}", value);

}
