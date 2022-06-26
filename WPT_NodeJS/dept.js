const exp = require("express");
const app = exp();
app.use(exp.static("stat"));

const mysql = require("mysql2");
let dbParameters = {
    host: '127.0.0.1',
    user: 'root',
    password: 'cdac',
    database: 'mumbai',
    port: 3306
};
const conn = mysql.createConnection(dbParameters);

app.get("/getItem", (req, resp) => {
    let inanum = req.query.anum;
    let output = { status: false, row: {} }
    conn.query("select * from accounts where anum=?", [inanum], (err, rows) => {
        if (err) {
            console.log("error connecting to server");
        }
        if (rows.length > 0) {
            output.status = true;
            output.row = rows[0];
        }
        resp.send(output);
    });
});


app.get("/update", (req, resp) => {
    let output = { status: false };
    conn.query("update accounts set bal=? where anum=?", [req.query.bal, req.query.anum], (err, res) => {
        if (err) {
            console.log("Database error: " + err);
        }
        if (res.affectedRows > 0) {
            output.status = true;
        }
        resp.send(output);
    });
});


app.get("/display", (req, resp) => {
    let output = { status: false, row: [] };
    conn.query("SELECT * FROM ACCOUNTS;", [], (err, rows) => {
        if (err) {
            console.log("Database error: " + err);
        }
        if (rows.length > 0) {
            output.status = true;
            for (let i = 0; i < rows.length; i++) {
                output.row.push(rows[i]);
            }
        }
        resp.send(output);
    });
});

app.listen(80, () => {
    console.log("listening to 80...");
})