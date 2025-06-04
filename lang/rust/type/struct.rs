struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let size = std::mem::size_of::<User>();
    println!("the size of User is: {} bytes", size);

    let user1 = User {
        email: String::from("596310898@163.com"),
        username: String::from("hickiy"),
        active: true,
        sign_in_count: 1,
    };

    let email_field_size = std::mem::size_of_val(&user1.email);
    let username_field_size = std::mem::size_of_val(&user1.username);
    let active_field_size = std::mem::size_of_val(&user1.active);
    let sign_in_count_field_size = std::mem::size_of_val(&user1.sign_in_count);

    let total_size =
        email_field_size + username_field_size + active_field_size + sign_in_count_field_size;
    println!("the total size of `user1` is: {}", total_size);

    println!("does total_size equal size?");
    println!(
        "the result is: {}, because size is a aligned-size but total_size is a unaligned-size",
        total_size == size
    );

    let email_value_size = user1.email.capacity();
    let username_value_size = user1.username.capacity();

    println!("the email field used heap-size is: {}", email_value_size);
    println!(
        "the username field used heap-size is: {}",
        username_value_size
    );

    let email_len = user1.email.len();

    println!(
        "does email_len equal email_value_size?, the result is {}, because emial field just contain ASCLL code",
        email_value_size == email_len
    );
}
