// 2.	Create a table called  item with itemno integer, primary key, itemname varchar(15), price integer, category varchar(15)
// a.	Demonstrate
// i.	Insert
// ii.	Update  -- category and price
// iii.	Multi select – query on category
// iv.	Single select  -- query on itemno.


const exp = require("express");
const app = exp();
app.use(exp.static("stat"));

let dbParameters = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'mumbai',
    port: 3306
};
const mysql = require("mysql2");
let conn = mysql.createConnection(dbParameters);

app.get("/getItem", (req, resp) => {
    let ininum = req.query.inum;
    let output = { status: false, row: {} };
    conn.query("select * from items where itemno=?", [ininum], (err, rows) => {
        if (rows.length > 0) {
            output.status = true;
            output.row = rows[0];
            console.log("Item found in DB");
        } else {
            console.log("Item not found in DB");
        }
        if (err) {
            console.log("Could not connect to data base. ERROR");
        }
        resp.send(output);
    });
});


app.get("/insert", (req, resp) => {
    let x = req.query.inum;
    let p = req.query.price;
    let c = req.query.cat;
    let n = req.query.name;

    let output = { status: false };
    conn.query("select * from items where itemno=?", [x], (err, rows) => {
        console.log(rows.length);
        if (rows.length == 0) {
            conn.query("insert into items values (?,?,?,?)", [x, n, p, c], (err, response) => {
                if (response.affectedRows > 0) {
                    output.status = true;
                    console.log("Item inserted Successfully");
                }
                if (err) {
                    console.log("Error in DB connection", err);
                }
                resp.send(output);
            });
        } else {
            console.log("Item already exist");
            resp.send(output);
        }
        if (err) {
            console.log("Could not connect to data base. ERROR", err);
        }
    });
});


app.get("/update", (req, resp) => {
    let x = req.query.inum;
    let p = req.query.price;
    let c = req.query.cat;
    let n = req.query.name;

    let output = { status: false };
    conn.query("update items set price=?, category=?, itemname=? where itemno=?", [p, c, n, x], (err, res) => {
        if (res.affectedRows > 0) {
            output.status = true;
            console.log("Item updated in DB");
        } else {
            console.log("Item not found in DB");
        }
        if (err) {
            console.log("Could not connect to data base. ERROR");
        }
        resp.send(output);
    });
});


app.get("/cat", (req, resp) => {
    let c = req.query.cat.toUpperCase();

    let output = { status: false, rows: [] };
    conn.query("select * from items where category=?", [c], (err, row) => {
        if (row.length > 0) {
            output.status = true;
            for (let i = 0; i < row.length; i++) {
                output.rows.push(row[i]);
            }
            console.log("Category found");
        } else {
            console.log("category not found");
        }
        if (err) {
            console.log("Could not connect to data base. ERROR");
        }
        resp.send(output);
    });
});


app.listen(90, () => {
    console.log("server listening at port 90...");
});
