define('b', ['c'], function(c) {
    console.log('b running')
    console.log(c);
    return {name: 'b'}
})
