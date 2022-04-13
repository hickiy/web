import b from './b.js';

console.log('a.js print init count.value:', b.count.value);
setTimeout(() => {
  b.updateCount();
  console.log('a.js print updated count.value:', b.count.value);
}, 0)

export const msg = 'eval complated';