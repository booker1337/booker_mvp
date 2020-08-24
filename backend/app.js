const cors = require('cors');
const path = require('path');
require('express-async-errors');
const express = require('express');
const { requestLogger, errorHandler } = require('./util/middleware');
const appRoutes = require('./routes/api/auth');
const usersRotes = require('./routes/api/users');

const app = express();

require('./loaders/database'); // Load Database

app.use(cors()); // 
app.use(express.json()); // Parse JSON into req.body

app.use(requestLogger); // Logger for routes (Only displays on 'silly' LOGGER_LEVEL)

app.use(express.static('build')); // React build

app.use('/api/auth', appRoutes);
app.use('/api/users', usersRotes);

app.use(errorHandler); // Handles all uncaught exceptions in routes

app.get((_req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html'))); // React Router

app.use((_req, res) => res.sendStatus(404));

module.exports = app;
