(module
  ;; 导入wasi的fd_write
  (import "wasi_snapshot_preview1" "fd_write"
    (func $fd_write (param i32 i32 i32 i32) (result i32))
  )

  ;; 内存声明
  (memory 1)
  (export "memory" (memory 0))

  ;; 辅助缓冲区
  (data (i32.const 1024) "0000000000\n") ;; 预留11字节用于数字和换行

  ;; 斐波那契函数
  (func $fib (param $n i32) (result i32)
    (local $a i32)
    (local $b i32)
    (local $i i32)
    (local $tmp i32)
    (if (result i32)
      (i32.le_s (local.get $n) (i32.const 1))
      (then (local.get $n))
      (else
        (local.set $a (i32.const 0))
        (local.set $b (i32.const 1))
        (local.set $i (i32.const 2))
        (block $break
          (loop $loop
            (br_if $break (i32.gt_s (local.get $i) (local.get $n)))
            (local.set $tmp (i32.add (local.get $a) (local.get $b)))
            (local.set $a (local.get $b))
            (local.set $b (local.get $tmp))
            (local.set $i (i32.add (local.get $i) (i32.const 1)))
            (br $loop)
          )
        )
        (local.get $b)
      )
    )
  )

  ;; 数字转字符串（右对齐，写入1024地址，返回长度）
  (func $itoa (param $n i32) (result i32)
    (local $i i32)
    (local $ptr i32)
    (local $digit i32)
    (local.set $i (i32.const 0))
    (local.set $ptr (i32.const 1034)) ;; 1024+10
    (block $done
      (loop $loop
        (local.set $digit (i32.rem_u (local.get $n) (i32.const 10)))
        (i32.store8 (local.get $ptr) (i32.add (local.get $digit) (i32.const 48)))
        (local.set $n (i32.div_u (local.get $n) (i32.const 10)))
        (local.set $ptr (i32.sub (local.get $ptr) (i32.const 1)))
        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br_if $done (i32.eqz (local.get $n)))
        (br $loop)
      )
    )
    ;; 写入换行符
    (i32.store8 (i32.add (local.get $ptr) (i32.add (local.get $i) (i32.const 1))) (i32.const 10))
    ;; 返回数字字符串起始地址
    (return (local.get $ptr))
  )

  ;; main函数
  (func (export "_start")
    (local $n i32)
    (local $result i32)
    (local $str_ptr i32)
    (local $len i32)
    (local $iov_ptr i32)

    (local.set $n (i32.const 10)) ;; 计算fib(10)
    (local.set $result (call $fib (local.get $n)))
    (local.set $str_ptr (call $itoa (local.get $result)))
    (local.set $len (i32.sub (i32.const 1035) (local.get $str_ptr))) ;; 数字长度+换行

    ;; iovec结构体写入
    (local.set $iov_ptr (i32.const 900))
    (i32.store (local.get $iov_ptr) (local.get $str_ptr)) ;; buf ptr
    (i32.store (i32.add (local.get $iov_ptr) (i32.const 4)) (local.get $len)) ;; buf len

    ;; fd_write(1, &iovec, 1, &written)
    (call $fd_write
      (i32.const 1)
      (local.get $iov_ptr)
      (i32.const 1)
      (i32.const 800)
    )
    drop
  )
)