let dbParameters = {
    host: '127.0.0.1',
    user: 'root',
    password: 'cdac',
    database: 'mumbai',
    port: 3306
};
const mysql = require("mysql2");
let conn = mysql.createConnection(dbParameters);

const express = require("express");
const { Console } = require("console");
const app = express();

app.use(express.static("stat"));

app.get("/getItem", (req, res) => {
    let inputPin = req.query.pin;
    console.log("Pincode received by server: ", inputPin);
    let output = { status: false, row: {} };
    conn.query("select * from location where pin=?", [inputPin],
        (err, rows) => {
            if (rows.length > 0) {
                console.log("Connected to database");
                output.status = true;
                output.row = rows[0];
                console.log(rows[0]);
            }
            if (err) {
                console.log("Could not connect to database");
            }
            res.send(output);
        });

});


app.get("/update", (req, resp) => {
    let inpin = req.query.pin;
    let inarea = req.query.area;
    let output = { status: false }
    console.log(inpin + inarea);
    conn.query("update location set area=? where pin=?", [inarea, inpin], (err, res) => {
        if (res.affectedRows > 0) {
            output.status = true;
        } else {
            output.status = false;
        }
        if (err) {
            console.log("Could not connect to database");
        }
        resp.send(output);
    });
});

app.listen(80, function () {
    console.log("server listening at port 99...");
});

// "update location set area=? where pin=?", [area, pin],(err, rows)=>{}