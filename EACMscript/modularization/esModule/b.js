import { msg } from './a.js';
let count = { value: 1 };
setTimeout(() => console.log('b.js print a.msg:', msg), 0,);
export default {
  count,
  updateCount() {
    count.value = 2;
    console.log('b.js print count.value:', count.value);
  }
}
