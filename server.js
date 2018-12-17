const express = require('express');
const api = require('./api/index');

const host = process.env.TWITCH_HOST || '0.0.0.0';
const port = 8268;

const app = express();
app.use('/', api);

app.listen(port, host, () => console.log(`magic at ${host}:${port}`));
