var obj = {};
// Object.defineProperty(obj, 'reduce', {
//   writable: true,
// });
// const discriptor = Object.getOwnPropertyDescriptor( obj, 'reduce');
// console.log(discriptor);

// obj.reduce = 12;
// console.log(obj.reduce)

// Object.defineProperty(obj, 'reduce', {
//   writable: false,
// })

// const discriptor1 = Object.getOwnPropertyDescriptor( obj, 'reduce');
// console.log(discriptor1);


Object.defineProperty(obj, 'reduce', {
  configurable: true,
  enumerable: true,
  get() {
    return obj._reduce;
  },
  set(value) {
    console.log(value);
    obj._reduce = value;
  }
})
obj.reduce = '123'
