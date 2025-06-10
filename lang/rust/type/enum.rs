enum IpAddrKind {
    V4, // 1 byte
    V6, // 1 byte
}

struct IpAddr { // aligned size is 32byte, include 7 bytes of padding
    kind: IpAddrKind, // 1 byte, align rule is 1 byte but it will be aligned
    address: String, //  24 byte, 3 usize, align rule is 8 byte
}

fn main() {
    let home = IpAddr {
        kind: IpAddrKind::V4,
        address: String::from("127.0.0.1"), 
        // address' length is 9, it occupied heap memory is 9 byte
        // because it's only contain ascll code
     };

    let loopback = IpAddr {
        kind: IpAddrKind::V6,
        address: String::from("::1"),
    };

    let size = std::mem::size_of::<IpAddr>();
    println!("the size of IpAddrKind is: {}", size);
}
