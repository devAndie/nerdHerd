
const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = mysql.createPool({
    host: "host",
    user: "root",
    password: "password",
    database: "nerdHerd"
 });

 app.get("/api/technicians", (req, res) => {
     pool.query("SELECT id, Technician_name FROM technician", (error, rows) => {
         if (error) {
             return res.status(500).json({ error });
         }

        res.json(rows);
    });
 });

 app.listen(9000, () => console.log("App listening on port 9000"));