// console.log(Math.LN10)
// console.log(Math.log(10));
// console.log(Math.pow(Math.E, Math.log(10)));

// console.log(Math.LN2);
// console.log(Math.log(2));
// console.log(Math.pow(Math.E, Math.log(2)));

// console.log(Math.LOG10E)
// console.log(Math.log10(Math.E))
// console.log(Math.E);
// console.log(Math.pow(10, Math.log10(Math.E)));

// console.log(Math.LOG2E)
// console.log(Math.log2(Math.E))
// console.log(Math.E);
// console.log(Math.pow(2, Math.log2(Math.E)))

// console.log(Math.SQRT2);
// console.log(Math.sqrt(2));

// console.log(Math.SQRT1_2);
// console.log(Math.sqrt(0.5));

// console.log(Math.exp(-1));
// console.log(Math.pow(Math.E, -1));
// console.log(Math.exp(1));
// console.log(Math.pow(Math.E, 1));
// console.log(Math.exp(0));
// console.log(Math.pow(Math.E, 0));

// const angle = 90;
// const sin = Math.sin((angle * Math.PI) / 180);
// const asin = Math.asin(sin) * (180 / Math.PI);
// console.log(sin, asin); // 1 90

// const cos = Math.sinh(angle);
// console.log(cos); // 3.6268604078470186

// var a = 10;
// console.log(a / 0); // Infinity
// console.log(0 / a); // 0
// console.log(a / -0); // -Infinity
// console.log( a / 0 === a / -0); // false

// var b = 10;
// console.log(0 ** b); // 0
// console.log(b ** 0); // 1
// console.log(b ** -0); // 1
// console.log(b ** 1); // 10
// console.log(b ** -1); // 0.1
// console.log(b ** 2); // 100
// console.log(b ** -2); // 0.01

var base = 16;
var exponent = 4 ** -1;
var four_root_of_sixteen = base ** exponent;
console.log(four_root_of_sixteen); // 2
console.log((four_root_of_sixteen ** 4)); // 16