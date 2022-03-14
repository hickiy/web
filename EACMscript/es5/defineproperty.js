var obj = {};
Object.defineProperty(obj, 'reduce', {
  writable: true,
});
const discriptor = Object.getOwnPropertyDescriptor( obj, 'reduce');
console.log(discriptor);

obj.reduce = 12;
console.log(obj.reduce)

Object.defineProperty(obj, 'reduce', {
  writable: false,
})

const discriptor1 = Object.getOwnPropertyDescriptor( obj, 'reduce');
console.log(discriptor1);


