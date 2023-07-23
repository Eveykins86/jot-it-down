const express = require('express');
const path = require('path');
const api = require('./routes/index');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log('application succsefully listening to http://localhost:${PORT}')
})
.catch((err) => {
    console.log(err);
})