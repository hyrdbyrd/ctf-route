const express = require('express');

const router = express.Router();

const FLAG = 'Ajax_is_Awsome';
let db = [
    {
        name: 'Ilya',
        message: 'I love all of you!'
    },
    {
        name: 'Meffistofil',
        message: '\\{ 0-M-0 }/'
    }
];

router.get('/api', (req, res) => {
    res.statusCode = 200;
    res.send(db);
});

router.post('/api/clear', (req, res) => {
    db = [];
    res.sendStatus(200);
});

router.post('/api', (req, res) => {
    const { body } = req;
    if (!body.name || !body.message) {
        res.sendStatus(400);
        return;
    }

    if (!body.name.match(/^[A-ZА-Я][a-zа-я]{5,}$/ig)) {
        res.sendStatus(400);
        return;
    }

    db.push(body);
    if ('flag' in body) {
        res.send({ FLAG });
        return;
    }
    res.sendStatus(200);
});

module.exports = router;