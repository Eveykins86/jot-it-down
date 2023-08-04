//Import required modules
const express = require('express');
const path = require('path');
const notesRouter = require('./routes/notes');
const api = require('./routes/notes');

//Create Express application
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Application successfully listening on http://localhost:${PORT}`);
});

//Middleware setup
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);
app.use('/notes', notesRouter);


// Route for "/notes" path
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Route for all other paths (default route)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Application successfully listening to http://localhost:${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

module.exports = app;