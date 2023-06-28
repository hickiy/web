const p = () => new Promise(function(resolve, reject){
    reject(false);
})

async function test(){
    const result = await p().catch(err => err);
    console.log(result);
} 

test();