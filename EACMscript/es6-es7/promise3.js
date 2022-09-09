const p = new Promise((resolve, reject) => {
  resolve('resolve')
})

const p1 = p.finally(() => {
  console.log('finally')
})

setTimeout(() => {
  console.log(p, p1);
})

