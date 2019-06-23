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
app.get("/api/enquirers", (req, res) => {
    pool.query("SELECT * FROM enquirers", (error, rows) => {
       if (error) {
           return res.status(500).json({ error });
       }
       res.json(rows);
   });
});
app.get("/api/Operators", (req, res) => {
    pool.query("SELECT * FROM Operators", (error, rows) => {
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

app.get("/api/technicians/:id/Tech_Support", (req, res) => {
    pool.query(
        "SELECT e.enquirer_id, e.enquirer_name, problem, e.operator_id, operator_name, e.technician_id, technician_name, affiliation FROM enquirers e JOIN operators o ON o.operator_id= e.operator_id JOIN technicians t ON t.technician_id= e.technician_id WHERE e.enquirer_id = 4",
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(rows);
        }
    );
});
app.get("/api/technicians/:id/Technician_Dispatch", (req, res) => {
    pool.query(
        "SELECT e.enquirer_id, e.enquirer_name, problem, e.operator_id, operator_name, e.technician_id, technician_name, affiliation FROM enquirers e JOIN operators o ON o.operator_id= e.operator_id JOIN technicians t ON t.technician_id= e.technician_id WHERE technician_dispatch='yes'",
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(rows);
        }
    );
});
app.get("/api/technicians/:id/Generate_Report", (req, res) => {
    pool.query(
        "SELECT e.enquirer_id, e.enquirer_name, problem, technician_dispatch, e.operator_id, operator_name, department technician_id, technician_name, affiliation FROM enquirers e JOIN operators o ON o.operator_id= e.operator_id JOIN technicians t ON t.technician_id= e.technician_id",
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