let lastTime = 0
let rAF = fn => {
  let currentTime = Date.now();
  let timeToCall = Math.max(0, 16 - (currentTime - lastTime));
  setTimeout(fn, timeToCall);
  lastTime = currentTime + timeToCall;
}

let count = 0;
let beingTime = Date.now();
let cb = () => {
  let timeStemp = Date.now();
  let process = (timeStemp - beingTime);
  if (process < 1000) {
    rAF(cb);
    count++;
  } else {
    console.log(count)
  }
}
rAF(cb);