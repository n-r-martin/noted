const express = require('express');

// Import the modular router /notes
const notesRouter = require('./notes');


const app = express();

app.use('/notes', notesRouter);


module.exports = app;
