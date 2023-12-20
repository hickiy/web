var a = 10;
var b = 5;
var c = a - b; // normal subtraction
var d = a + ~b + 1; // two's complement's subtraction
console.log(c, d);

var e = 10;
var f = 5;
var g = e * f; // normal multiplication
var h = (e << 2) + e; // left shift multiplication
console.log(g, h);

var i = 1000;
var j = 5;
var k = i / j; // normal division
var l = i * Math.pow(j, -1); // inverse multiplication
console.log(k, l);

