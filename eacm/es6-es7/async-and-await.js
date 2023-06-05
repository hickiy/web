function f1() {
  return new Promise((resolve, reject) => {
    reject('reject');
  });
}

async function f2() {
    return await f1();
}

f2().catch(function (err) {
  console.log(err);
});
