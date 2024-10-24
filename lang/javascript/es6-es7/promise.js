console.log('script start');              
setTimeout(function () {
    console.log('settimeout')                          
});
let promise1 = new Promise(function (resolve) {
    console.log('promise1')                  
    resolve()
    console.log('promise1 end')               
}).then(function () { 
    console.log('promise2')                     
});
console.log('script end');                      


