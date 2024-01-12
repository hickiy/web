function* iteratorFn2() {
  yield 1;
  return 2;
}
let g = iteratorFn2();
console.log(g.next());
console.log(g.next());
console.log(g.next());