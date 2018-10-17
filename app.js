const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Routes
const indexRouter = require('./routes/index');
const tasksRouter = require('./routes/tasks');
const taskJSONRoute = require('./routes/task-json');
const taskSQLRouter = require('./routes/task-sql');
const taskAzinoRouter = require('./routes/task-azino');

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'pug');

app
    .use(logger('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use((req, res, next) => {
        res.locals.host = `${req.secure ? 'https' : 'http'}://${req.headers.host}`;
        next();
    })
    .use('/static', express.static(path.join(__dirname, 'public')))
    .use('/', indexRouter)
    .use('/tasks', tasksRouter)
    .use('/tasks/web/JSON', taskJSONRoute)
    .use('/tasks/web/SQL', taskSQLRouter)
    .use('/tasks/Web/AZINO', taskAzinoRouter)
    .use((req, res, next) => {
        next(createError(404));
    }) 
    .use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status = err.status || 500;
        res.render('error');
        next();
    });

module.exports = app;
