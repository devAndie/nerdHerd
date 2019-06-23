require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

app.get("/api/technicians", (req, res) => {
     pool.query("SELECT * FROM technicians", (error, rows) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(rows);
    });
});

app.get("/api/Technicians/:id", (req, res) => {
    pool.query(
           "SELECT Technician_id, Technician_name FROM Technicians WHERE Technician_id = 2",
           [req.params.id],
           (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(rows);
        }
    );
});

 app.listen(9000, () => console.log("App listening on port 9000"));