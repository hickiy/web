async function asy1() {
    const res = await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() * 10 > 5) {
                resolve('定时器执行了');
            } else {
                reject(new Error('定时器错误'));
            }
        }, 1000);
    });
    return res;
}

async function asy2() {
    try {
        const res = await asy1();
        console.log('获取返回值', res);
    } catch (err) {
        console.warn('捕获异常：', err);
    }
}

asy2();
