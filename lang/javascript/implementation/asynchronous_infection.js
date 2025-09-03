async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
}

function main() {
  let result = fetchData();
  console.log(result);
}

function run(fn) {
  let cache = {
    status: "pending",
    value: null,
  }
  let oldFetchData = fetchData;
  function newFetchData() {
    if (cache.status === "pending") {
      throw oldFetchData().then((value) => {
        cache.status = "fullfilled";
        cache.value = value;
      }).catch((err) => {
        cache.status = "rejected";
        cache.value = err;
      });
    }
    if (cache.status === "fullfilled") {
      return cache.value;
    }
    if (cache.status === "rejected") {
      throw cache.value;
    }
  }
  fetchData = newFetchData;
  try {
    fn();
  } catch (e) {
    e.then(() => {
      fetchData = newFetchData;
      fn();
      fetchData = oldFetchData;
    })
  }
  fetchData = oldFetchData;
}

run(main);