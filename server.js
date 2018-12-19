const express = require('express');
const api = require('./api/index');

const host = process.env.CHROME_ACTIONS_HOST || '0.0.0.0';
const port = 8888;

const app = express();
app.use('/', api);

app.listen(port, host, () => console.log(`🚀 deployed at ${host}:${port}`));
