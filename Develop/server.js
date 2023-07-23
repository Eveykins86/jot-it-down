//Import required modules
const express = require('express');
const path = require('path');
const api = require('./routes/index');

//Create Express application
const app = express();
const PORT = 3001;

//Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/api', api);

//Route for the root path '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Sart the server
const server = app.listen(PORT, () => {
    console.log('application succsefully listening to http://localhost:${PORT}')
})
server.on('error', (err) => {
    console.error('Server error:', err);
});