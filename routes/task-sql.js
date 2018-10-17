const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sql_task'
});

router.get('/api', (req, res) => {
    const name = req.query.name;
    if (!name) {
        connection.query('SELECT * FROM products LIMIT 3', (err, result) => {
            if (err) {
                res.status = 300;
                res.send(JSON.stringify([]));
            }
            res.send(result);
        });
        return;
    }

    const sql = `SELECT * FROM products WHERE name='${name}' LIMIT 1`;
    if (/(CREATE|USE|JOIN)/ig.test(sql)) {
        res.status = 300;
        res.send(JSON.stringify([]));
        return;
    }
    connection.query(sql, (err, result) => {
        if (err || !result) {
            res.status = 300;
            res.send(JSON.stringify([]));
            return;
        }
        res.send(result);
    });
});

module.exports = router;