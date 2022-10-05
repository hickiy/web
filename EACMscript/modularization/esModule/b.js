let c = 'c'
import a from './a.js';
console.log('b runing');
window.setTimeout(function () {
  console.log(a)
  console.log(import(`./${c}.js`).then(function(){
    console.log('module c loaded');
  }))
}, 0)
export default {
  name: 'b',
}
