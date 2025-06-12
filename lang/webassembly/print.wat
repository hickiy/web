(module
  (import "wasi_snapshot_preview1" "fd_write"
    (func $fd_write (param i32 i32 i32 i32) (result i32))
  )

  (memory 1)
  (export "memory" (memory 0))

  (data (i32.const 8) "hello world\n")

  ;; iovec sruct
  ;; iovec.ptr = 8, iovec.len = 12
  (data (i32.const 0) "\08\00\00\00\0c\00\00\00")

  (func $main (export "_start")
    ;; fd = 1 (stdout)
    i32.const 1         ;; fd
    i32.const 0         ;; iovs
    i32.const 1         ;; iovs_len
    i32.const 20        ;; nwritten ptr
    call $fd_write
    drop
  )
)