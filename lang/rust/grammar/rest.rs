struct User {
    username: String,
    email: String,
}

fn main() {
    let user1 = User {
        username: String::from("hickiy"),
        email: String::from("596310898@163.com"),
    };

    let user2 = User {
        username: String::from("yanyun"),
        ..user1 //  ----------- value moved here
    };

    println!("does the user1's email and the user2's email is a same value?");

    println!(
        "the answer is not, because user1's email is moved to user2's email field, the user1's email is: {}",
        user1.email //  ^^^^^^^^^^^ value borrowed here after move
    );
}
