// 3.	Nodejs inbuilt module http
// a.	Setup a web server on port 800
// b.	Read a parameter called radius from the url string
// c.	Print the diameter on the browser window.


const http = require("http");
const url = require("url");

http.createServer((req, resp) => {
    console.log("Server listening to port 800...");
    let q = url.parse(req.url, true).query;
    let r = q.radius;
    console.log("Diameter = ", 2 * r);
}).listen(800);