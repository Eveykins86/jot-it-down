const express = require('express');

const notesRouter = require('./notes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/notes', notesRouter);

app.listen(PORT, () => {
    console.log('Server listening on port ${PORT')
});

module.exports = app;