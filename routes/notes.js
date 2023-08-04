const notesRouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../db/db.json');

//retrieves all notes from db.json file
notesRouter.get('/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync(dbPath))
    res.json(notes);
})


// Creates new note and adds it to db.json file
notesRouter.post('/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync(dbPath))
    req.body.id = uuidv4();
    notes.push(req.body);
    fs.writeFileSync(dbPath, JSON.stringify(notes));
    res.status(200);
})

//Route to delete note
notesRouter.delete('/notes/:id', (req, res) => {
    let requestedId = req.params.id;
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter((note) => note.id !== requestedId);

        fs.writeFileSync(dbPath, JSON.stringify(updatedNotes, null, 4));

        // Create success message
        const response = {
            status: 'Note successfully deleted!',
            id: requestedId,
        };
        res.json(response);
    } catch (error) {
        console.error('Error reading/parsing db.json:', error);
        res.status(500).json({ error: 'Failed to read data from the database.' });
    }
});

module.exports = notesRouter;
