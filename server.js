const express = require('express');
const api = require('./api/index');

const host = process.env.CHROME_ACTIONS_HOST || '0.0.0.0';
const port = 8888;

const app = express();
app.use('/', api);

// The timeout is just so I can wait for the chromix-too server to start. I will
// eventually rewrite the server so it doesn't do `process.exit` on errors, and
// so it just retries connecting to the socket in case it doesn't find it.
setTimeout(() => {
  app.listen(port, host, () => console.log(`🚀 deployed at ${host}:${port}`));
}, 5000);
