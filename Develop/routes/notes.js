const notesRouter = require('express').Router();
const fs = require('fs');

notesRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

notesRouter.post('/', (req, res) => {
    
});

module.exports = notesRouter