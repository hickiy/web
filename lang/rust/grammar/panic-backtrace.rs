fn main() {
    let v = vec![1, 2, 3];
    v[99];
}

// thread 'main' panicked at panic-backtrace.rs:3:6:
// index out of bounds: the len is 3 but the index is 99
// stack backtrace:
//    0: std::panicking::begin_panic_handler
//              at /rustc/17067e9ac6d7ecb70e50f92c1944e545188d2359/library\std\src\panicking.rs:697
//    1: core::panicking::panic_fmt
//              at /rustc/17067e9ac6d7ecb70e50f92c1944e545188d2359/library\core\src\panicking.rs:75
//    2: core::panicking::panic_bounds_check
//              at /rustc/17067e9ac6d7ecb70e50f92c1944e545188d2359/library\core\src\panicking.rs:273
//    3: std::rt::lang_start
//    4: std::rt::lang_start
//    5: std::rt::lang_start
//    6: std::rt::lang_start
//    7: std::rt::lang_start
//    8: std::rt::lang_start
//    9: std::rt::lang_start_internal::closure$0
//              at /rustc/17067e9ac6d7ecb70e50f92c1944e545188d2359/library\std\src\rt.rs:168
//   10: std::panicking::try::do_call
//              at /rustc/17067e9ac6d7ecb70e50f92c1944e545188d2359/library\std\src\panicking.rs:589
//   11: std::panicking::try
//              at /rustc/17067e9ac6d7ecb70e50f92c1944e545188d2359/library\std\src\panicking.rs:552
//   12: std::panic::catch_unwind
//              at /rustc/17067e9ac6d7ecb70e50f92c1944e545188d2359/library\std\src\panic.rs:359
//   13: std::rt::lang_start_internal
//              at /rustc/17067e9ac6d7ecb70e50f92c1944e545188d2359/library\std\src\rt.rs:164
//   14: std::rt::lang_start
//   15: main
//   16: invoke_main
//              at D:\a\_work\1\s\src\vctools\crt\vcstartup\src\startup\exe_common.inl:78
//   17: __scrt_common_main_seh
//              at D:\a\_work\1\s\src\vctools\crt\vcstartup\src\startup\exe_common.inl:288
//   18: BaseThreadInitThunk
//   19: RtlUserThreadStart
// note: Some details are omitted, run with `RUST_BACKTRACE=full` for a verbose backtrace.