import { pool } from '../db.js'

const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * from employee");
        res.json(rows);
    } catch (err) {
        // throw new Error(`Ocurrio un error`)
        return res.status(500).json({
            message: "Algo ocurrio en el servidor",
            err
        })
    }
}

const getEmployee = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * from employee where id = ?", [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: "Empleado no encontrado"
        })
        res.json(rows[0]);
    } catch (err) {
        return res.status(500).json({
            message: "Algo ocurrió en el servidor"
        })
    }
}

const createEmployees = async (req, res) => {
    try {
        const { name, salary } = req.body;
        const [rows] = await pool.query("INSERT INTO employee (name, salary) VALUES (?, ?)", [name, salary])
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (err) {
        return res.status(500).json({
            message: "Algo ocurrió en el servidor"
        })
    }
}
const updateEmployees = async (req, res) => {
    try {
        const { name, salary } = req.body;
        const id = req.params.id;
        const [rows] = await pool.query("update employee set name=IFNULL(?, name), salary=IFNULL(?, salary) where id=?", [name, salary, id]);
        if (rows.affectedRows <= 0) return res.status(404).json({
            "message": "Empleado no encontrado"
        })
        const [result] = await pool.query("SELECT * FROM employee WHERE id = ?", [id]);
        res.json(result[0]);
    } catch (err) {
        return res.status(500).json({
            message: "Algo ocurrió en el servidor",
            err
        })
    }
}

const deleteEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query("DELETE from employee where id = ?", [req.params.id]);

        if (rows.affectedRows <= 0) return res.status(404).json({
            "message": "Empleado no encontrado"
        })
        res.sendStatus(204);
    } catch (err) {
        return res.status(500).json({
            message: "Algo ocurrió en el servidor"
        })
    }
}

export {
    getEmployees,
    getEmployee,
    updateEmployees,
    createEmployees,
    deleteEmployees
}