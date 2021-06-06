function f1() {
    const p1 =  new  Promise((resolve, reject) => {
        if(Math.random() * 10 > 5){
            resolve()
        } else {
            reject()
        }
    })
    const p2 = p1.then(function(){
        console.log('resolved')
    })
    const p3 = p2.catch(function(){
        console.log('rejected')
    })
    return p3
}


async function f2() {
    try {
        const res = await f1();
        console.log('f2 resolve')
    } catch (err) {
        console.log('f2 rejected')
    }
    return Promise.reject();
}


async function f3() {
    try {
        const res = await f2();
        console.log('f3 resolve')
    } catch (err) {
        console.log('f3 rejected')
    }
}

f3()