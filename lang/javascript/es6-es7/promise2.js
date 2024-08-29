console.log(1);   // 1
setTimeout(() => {
  console.log(2) // 6
  Promise.resolve().then(() => {
    console.log(3) // 7
  })

  setTimeout(() => {  
    console.log(4) // 9
  }, 0)
}, 0)

new Promise((resolve, reject) => {
  console.log(5) // 2
  resolve(6)
}).then((data) => {
  console.log(data) // 4
  data = 7
}).then((data) => {
  console.log(data) // 5
})

setTimeout(() => {
  console.log(8) // 8
}, 0)

console.log(9) // 3

