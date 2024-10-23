;;wasm module
(module
  ;;import js:print as js_print()
  (import "js" "print" (func $js_print (param i32 i32)))
  ;;import js:mem as memory
  (import "js" "mem" (memory 1))
  ;;export main
  (data (i32.const 0) "Hello, world!\n\37\38\a0\a1\a2")
    (func (export "main")
      i32.const 0 ;; memory offset
      i32.const 19 ;; memory length
      call $js_print ;; function to call
    )
)