const { exec } = require('child_process');

module.exports = (cmd) => new Promise((resolve, reject) => {
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(stdout, stderr);
  });
});
