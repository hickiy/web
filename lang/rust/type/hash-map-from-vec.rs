use std::collections::HashMap;

fn main() {
    let teams = vec![String::from("blue"), String::from("yellow")];
    let initial_score = vec![10, 50];

    let score: HashMap<_, _> = teams.iter().zip(initial_score.iter()).collect();

    println!("score is: {:?}", score);
}
