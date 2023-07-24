const notesRouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../db/db.json');

//retrieves all notes from db.json file
notesRouter.get('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync(dbPath))
    res.json(notes);
})


// Creates new note and adds it to db.json file
notesRouter.post('api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync(dbPath))
    req.body.id = uuidv4;
    notes.push
})

//Route to delete note
notesRouter.delete('/api/notes/:id', (req, res) => {
    let requestedId = req.params.id;
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        }
        else {
            const parsedNotes = JSON.parse(data);
            for(let i=0; i<parsedNotes.length; i++) {
                const currentNote = parsedNotes[i];
                if(currentNote.id === requestedId) {
                    parsedNotes.splice(i, 1);
                }
            }
            fs.writeFile(dbPath, JSON.stringify(parsedNotes, null, 4), (err) => {
                err ? console.error(err) : console.log('Successfully deleted note!')
            }
            );
        }
    });
    //create success message
    const response = {
        status: 'Note successfully deleted!',
        id: requestedId,
    }
    res.json(response);
})

module.exports = notesRouter;
