#[no_mangle]
pub extern "C" fn abs(x: i32) -> i32 {
    if x < 0 { -x } else { x }
}