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
    if (Operator.name = "") {
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
    if (Technician.name = "") {
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
app.post("/api/addenquirer", (req, res) => {
    const { enquirer_id, enquirer_name, enquirer_address } = req.body;
    if (!enquirer_id || !enquirer_name || !enquirer_address) {
        return res.status(400).json({ error: "Invalid payload" });
    }
    pool.query(
        "INSERT INTO enquirers (enquirer_id, enquirer_name, enquirer_address) VALUES (6, 'Mr Khal', 'Northlands')",
        [cinema_id, movie_id, time],
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
    if (Operator.name = "") {
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
    if (Technician.name = "") {
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
app.put("/api/enquirer/:id", (req, res) => {
    const { enquirer_id, Operator_id, Technician_id } = req.body;
    if (!enquirer_id || !Operator_id || !Technician_id) {
        return res.status(400).json({ error: "Invalid payload" });
    }
    pool.query(
        "UPDATE enquirers SET Operator_id = 3, Technician_id = 4, technician_dispatch = yes WHERE enquirer_id = 5",
        [cinema_id, movie_id, time, req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.changedRows);
        });
});
app.delete("/api/dropOperator/:id", (req, res) => {
    pool.query(
        "DELETE FROM Operator WHERE id = 4",
        [req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.affectedRows);
        }
    );
});
app.delete("/api/dropenquirer/:id", (req, res) => {
    pool.query(
        "DELETE FROM enquirers WHERE id = 6",
        [req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(results.affectedRows);
        }
    );
});

app.post("/api/nerdHerds", (req, res) => {
    const { Operator_id, Operator_name, Department } = req.body;
    if (!Operator_id || Operator_name || Department) {
        return res.status(400).json({ error: "Invalid payload" });
    }
    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(500).json({ error });
        }
        connection.beginTransaction(error => {
            if (error) {
                return res.status(500).json({ error });
            }
            connection.query(
                "INSERT INTO Operators (Operator_id, Operator_name, Department) VALUES (?, ?, ?)",
                [Operator_id, Operator_name, Department],
                (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            res.status(500).json({ error });
                        });
                    }
                    const insertId = results.insertId;
                    const Technician_id = genres = Technician_id.map(Technician_id => [insertId, Technician_id]);
                    const Technician_name = Technician_name.map(Technician_name => [insertId, Technician_name]);
                    const Affiliation = Affiliation.map(Affiliation => [insertId, Affiliation]);
                    connection.query(
                        "INSERT INTO Technicians (Technician_id, Technician_name, Affiliation) VALUES (?, ?, ?)",
                        [Technician_id, Technician_name, Affiliation],
                        (error, results) => {
                            if (error) {
                                return connection.rollback(() => {
                                    res.status(500).json({ error });
                                });
                            }
                            const insertId = results.insertId;
                            const enquirer_id = enquirer_id.map(enquirer_id => [insertId, enquirer_id]);
                            const enquirer_name = enquirer_name.map(enquirer_name => [insertId, enquirer_name]);
                            const enquirer_address = enquirer_address.map(enquirer_address => [insertId, enquirer_address]);
                            const problem = problem.map(problem => [insertId, problem]);
                            const Technician_Dispatch = Technician_Dispatch.map(Technician_Dispatch => [insertId, Technician_Dispatch]);
                            connection.query(
                                "INSERT INTO enquirers (enquirer_id, enquirer_name, enquirer_address, problem, problem, Technician_dispatch) VALUES (?, ?, ?, ?, ?)",
                                [enquirer_id, enquirer_name, enquirer_address, problem, Technician_Dispatch],
                                (error, results) => {
                                    if (error) {
                                        return connection.rollback(() => {
                                            res.status(500).json({ error });
                                        });
                                    }

                                    connection.commit(error => {
                                        if (error) {
                                            return connection.rollback(() => {
                                                res.status(500).json({ error });
                                            });
                                        }

                                        connection.release();
                                        res.json(insertId);
                                    });
                                }
                            )
                        }
                    )
                }
            )
        });
    });
});

app.listen(9000, () => console.log("App listening on port 9000"));

//coding with heart//
//edited by Mr Andrew Bundi K//