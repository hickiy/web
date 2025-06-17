fn is_a_part_of_char(byte: &u8) -> bool {
    (*byte >> 7) & 1 == 1
}

fn main() {
    let c: char = '你';

    let scalar = c as u32;

    let le_byte = scalar.to_le_bytes();
    let be_byte = scalar.to_be_bytes();

    println!("{:?}", le_byte);
    println!("{:?}", be_byte);


    let utf_8 = c.to_string().into_bytes();

    println!("{:?}", utf_8);

    for i in &utf_8 {
        if is_a_part_of_char(i) {
            println!("{:08b}", i);
        }
    }
}
