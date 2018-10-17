const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

const removeNotADir = e => e !== 'index.pug' || e !== '.' || e !== '..';

router.use((req, res, next) => {
    req.taskTypes = fs
        .readdirSync(path.join(__dirname, '../views/pages/', req.baseUrl))
        .filter(removeNotADir)
        .map(type => {
            let tasks = fs.readdirSync(path.join(__dirname, '../views/pages/', req.baseUrl, type));
            
            tasks = tasks
                .filter(removeNotADir)
                .map(e => e.replace(/\.[a-z]{1,5}$/, ''));

            return {
                type,
                tasks
            };
        });
    next();
});

/* GET tasks listing. */
router.get('/', (req, res) => {
    const list = req.taskTypes.map(obj => ({
        value: String(obj.type),
        href: `${req.baseUrl}/${obj.type}`
    }));

    res.render(
        '.' + req.baseUrl,
        {
            title: 'Таск лист',
            list
        }
    );
});

router.get('/:task/', (req, res) => {
    const list = [];
    const { taskTypes } = req;

    let index = 0;

    for (; index < taskTypes.length; index++)
        if (taskTypes[index].type === req.params.task)
            break;

    taskTypes[index].tasks.forEach(name => {
        list.push({
            value: name,
            href: `${req.baseUrl}/${String(req.params.task)}/${name}`
        });
    });

    res.render(
        '.' + req.baseUrl,
        {
            title: 'Раздел тасков ' + String(req.params.task),
            list
        }
    );
});

router.get('/:type/:task', (req, res) => {
    res.render(
        `.${req.baseUrl}/${req.params.type}/${req.params.task}`,
        { title: 'Таск №' + Number(req.params.task) }
    );
});

module.exports = router;
