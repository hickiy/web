setTimeout(function () {
    console.log('settimeout');                         
});
const p1 = Promise.all([123, true]);
p1.then(() => {
    console.log('not have promise');
})
console.log('promise1:', p1);

const p2 = Promise.all([]);
p2.then(() => {
    console.log('empty iterable object');
})
console.log('promise2:', p2);

// >>> Promise { <pending> }
// >>> Promise { [] }
// >>> empty iterable object
// >>> not have promise
// >>> settimeout