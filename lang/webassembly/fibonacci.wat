(module
  ;; 导入wasi的fd_write函数用于打印
  (import "wasi_snapshot_preview1" "fd_write"
    (func $fd_write (param i32 i32 i32 i32) (result i32))
  )

  ;; 递归计算斐波那契数
  (func $fib (param $n i32) (result i32)
    (if (result i32)
      (i32.lt_s (local.get $n) (i32.const 2))
      (then (local.get $n))
      (else
        (i32.add
          (call $fib (i32.sub (local.get $n) (i32.const 1)))
          (call $fib (i32.sub (local.get $n) (i32.const 2)))
        )
      )
    )
  )

  ;; 内存声明
  (memory 1)
  (export "memory" (memory 0))

  ;; 用于存储输出字符串的缓冲区
  (data (i32.const 1024) "Fibonacci(40) = ")

  ;; 主函数
  (func $main (export "_start")
    (local $ptr i32)
    (local $len i32)
    (local $tmp i32)
    (local $digit i32)
    (local $start i32)
    (local $i i32)
    ;; 计算fib(40)
    (local $result i32)
    (local.set $result (call $fib (i32.const 40)))
    ;; 将$result转换为字符串并拼接到缓冲区后面

    ;; 结果字符串写入的起始位置（"Fibonacci(40) = " 长度为16）
    (local.set $ptr (i32.const 1040))
    (local.set $tmp (local.get $result))
    (local.set $len (i32.const 0))

    (block $done
      (loop $convert
      (br_if $done (i32.eqz (local.get $tmp)))
      (local.set $digit (i32.rem_u (local.get $tmp) (i32.const 10)))
      (i32.store8
        (local.get $ptr)
        (i32.add (local.get $digit) (i32.const 48))
      )
      (local.set $ptr (i32.add (local.get $ptr) (i32.const 1)))
      (local.set $tmp (i32.div_u (local.get $tmp) (i32.const 10)))
      (local.set $len (i32.add (local.get $len) (i32.const 1)))
      (br $convert)
      )
    )

    ;; 如果结果为0，特殊处理
    (if (i32.eqz (local.get $len))
      (then
      (i32.store8 (i32.const 1040) (i32.const 48))
      (local.set $len (i32.const 1))
      (local.set $ptr (i32.add (i32.const 1040) (i32.const 1)))
      )
    )

    ;; 反转数字字符串
    (local.set $start (i32.const 1040))
    (local.set $i (i32.const 0))
    (block $reverse_done
      (loop $reverse
      (br_if $reverse_done (i32.ge_u (local.get $i) (i32.div_u (local.get $len) (i32.const 2))))
      (local.set $tmp
        (i32.load8_u (i32.add (local.get $start) (local.get $i)))
      )
      (i32.store8
        (i32.add (local.get $start) (local.get $i))
        (i32.load8_u (i32.add (local.get $start) (i32.sub (local.get $len) (i32.add (local.get $i) (i32.const 1)))))
      )
      (i32.store8
        (i32.add (local.get $start) (i32.sub (local.get $len) (i32.add (local.get $i) (i32.const 1))))
        (local.get $tmp)
      )
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      (br $reverse)
      )
    )

    ;; 添加换行符和结束符
    (i32.store8 (i32.add (i32.const 1040) (local.get $len)) (i32.const 10)) ;; '\n'
    (i32.store8 (i32.add (i32.const 1040) (i32.add (local.get $len) (i32.const 1))) (i32.const 0)) ;; '\0'

    ;; 更新 iov 长度（16 + 数字长度 + 1换行）
    (i32.store (i32.const 1004) (i32.add (i32.const 16) (i32.add (local.get $len) (i32.const 1))))

    ;; iov结构体
    (i32.store (i32.const 1000) (i32.const 1024)) ;; buf ptr
    (i32.store (i32.const 1004) (i32.const 25))   ;; buf len

    (call $fd_write
      (i32.const 1)      ;; fd 1 = stdout
      (i32.const 1000)   ;; iovs
      (i32.const 1)      ;; iovs_len
      (i32.const 0)      ;; nwritten
    )
    drop
  )
)