const express = require('express');
const api = require('./api/index');

const app = express();
app.use('/', api);


app.listen(4000, () => console.log('magic on port 4000'));
// app.listen(8268, () => console.log('magic on port 8268'));
