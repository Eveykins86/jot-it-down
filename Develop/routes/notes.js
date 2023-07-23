const notesRouter = require('express').Router();
const fs = require('fs');
const path = require('path');

const notesFilePath = path.join(__dirname, '../db/db.json');

//Helper function to read notes from the JSON file
function readNotesFromFile() {
    const data = fs.readFileSync(notesFilePath, 'utf8');
}

//Helper function to write notes to the JSON file
function writeNotesToFile(notes) {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes), 'utf8');
}

//Route to get all notes
notesRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//Route to save a new note
notesRouter.post('/', (req, res) => {
    const newNote = req.body;
    //Generate a unique ID for the new note
    newNote.id = generateUniqueId();

    const notes = readNotesFromFile();
    notes.push(newNote);

    writeNotesToFile(notes);

    res.json(newNote);
});

module.exports = notesRouter;
