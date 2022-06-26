// 2.	Non http
// a.	Write the function which returns previous number in a file called Jun15_1.js
// b.	In the file Jun15_2.js , ensure the lib.js previousnumber function is getting called and print the result in the console. ( tiny bit on module)

let externalPrev = require("./Jun15_01");
console.log(externalPrev.prev(20));
