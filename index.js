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
        'SELECT e.enquirer_id, e.enquirer_name, problem, technician_dispatch, e.operator_id, operator_name, department, e.technician_id, technician_name, affiliation FROM enquirers e JOIN operators o ON o.operator_id= e.operator_id JOIN technicians t ON t.technician_id= e.technician_id',
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(rows);
        }
    );
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/addOperator", (req, res) => {
    const Operator = req.body;
    if (Operator.name="") {
    return res.status(400).json({ error: "Invalid payload" });
    }
    pool.query(
        "INSERT INTO Operators (Operator_id, Operator_name, department) VALUES (6, 'Billie Mwai', 'responder'), (7, 'Joe Baiden', 'responder'), (8, 'Thomas Kruger', 'responder')",
        [Operator.name],
        (error, results) => {
            if (error) {
             return res.status(500).json({ error });
            }
        res.json(results.insertId);
        } 
    );
});
app.post("/api/addTechnician", (req, res) => {
    const Technician = req.body;
    if (Technician.name="") {
    return res.status(400).json({ error: "Invalid payload" });
    }
     pool.query(
        "INSERT INTO Technicians (Technician_id, Technician_name, affiliation) VALUES (7, 'John Oloo', 'system Installation'), (8, 'Samwell Kiberenge', 'Hardware maintenance')",
        [Technician.name],
        (error, results) => {
            if (error) {
             return res.status(500).json({ error });
            }
        res.json(results.insertId);
        }
    );
});
app.put("/api/updateOperator", (req, res) => {
    const Operator = req.body;
    if(Operator.name="") {
        return res.status(400).json({ error: "Invalid payload" });
    }
    pool.query(
        "UPDATE Operators SET Department = 'responder' WHERE Operator_id = 3",
        [Operator.name, req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.changedRows);
        }
    );
});
app.put("/api/updateTechnician", (req, res) => {
    const Technician = req.body;
    if(Technician.name="") {
        return res.status(400).json({ error: "Invalid payload" });
    }
    pool.query(
        "UPDATE Technicians SET affiliation = 'networking' WHERE Technician_id = 3",
        [Technician.name, req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.changedRows);
        }
    );
});

app.post("/api/showtimes", (req, res) => {
    const { cinema_id, movie_id, time } = req.body;
    if (!cinema_id || !movie_id || !time) {
        return res.status(400).json({ error: "Invalid payload" });
    }
    pool.query(
        "INSERT INTO showtime (cinema_id, movie_id, time) VALUES (?, ?, ?)",
        [cinema_id, movie_id, time],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.insertId);
        }
    );
});
//updt
app.put("/api/Techsupport/:id", (req, res) => {
    const { enquirer_id, Operator_id, Technician } = req.body;
    if (!enquirer_id || !Operator_id || !Technician) {
        return res.status(400).json({ error: "Invalid payload" });
    }
    pool.query(
        "UPDATE showtime SET cinema_id = ?, movie_id = ?, time = ? WHERE id = ?",
        [cinema_id, movie_id, time, req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.changedRows);
        });
    });
app.delete("/api/showtimes/:id", (req, res) => {
    pool.query(
        "DELETE FROM showtime WHERE id = ?",
        [req.params.id],
        (error, results) => {
            if (error) {
    +                 return res.status(500).json({ error });
    +             }
    +
    +             res.json(results.affectedRows);
    +         }
    +     );
    + });

app.listen(9000, () => console.log("App listening on port 9000"));