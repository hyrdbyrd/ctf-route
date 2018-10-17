const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Главная' });
});

router.get('/help', (req, res) => {
    res.render('help', { title: 'Хелпа' });
});

module.exports = router;
