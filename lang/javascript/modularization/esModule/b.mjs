console.log('b is runing');
import a from './a.mjs';
console.log(a.info.value);
a.add();
console.log(a.info.value);
export default {
  info: a.info
};
