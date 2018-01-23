const URL = require('url').URL;
const express = require('express');
// Used for executing bash commands
const { exec } = require('child_process');

const app = express();

// List all open tabs on Chromium, get the first tab playing YouTube, get rid of
// the ID of the tab, strip the "- YouTube" part from the title of the tab,
// break the output in two lines, and reverse the order (so there's first the
// title and then the URL)
const currentTrack = () => `
  chromix-too ls | \\
  grep youtube | \\
  head -n1 | \\
  cut -f 1 -d ' ' --complement | \\
  sed 's/ - YouTube/\\n/' | \\
  sed 's/ /\\n🔊\t/' | \\
  sort -r
`;

// Use chromix-too to get the ID of the first tab that is playing YouTube, and
// then change the URL of that tab.
const changeTrack = url => `
  tab=$(chromix-too ls | grep youtube | head -n1 | cut -f 1 -d ' '); \\
  chromix-too raw 'chrome.tabs.update' $tab '{"url": "${url}"}'
`;


// Return the song playing if no URL is specified, otherwise change the current
// song.
app.get('/play', (req, res) => {
  let command = currentTrack();
  let output = stdout => res.send(stdout);

  // URL was specified, the user wants to change track.
  if (req.query.url) {
    let { url } = req.query;

    try {
      url = new URL(url);
    } catch (err) {
      res.send(`The link you specified is not valid.`);
      return;
    }

    if (url.hostname !== 'www.youtube.com') {
      res.send('Only YouTube links are allowed.');
      return;
    }

    command = changeTrack(url);
    output = () => res.send('Thank you for your song request!');
  }

  // Run the command and return the output.
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      res.status(500).send('Whoops.. There was a problem.');
      return;
    }

    console.log('stderr: ', stderr);
    console.log('stdout: ', stdout);
    output(stdout);
  });
});


app.listen(4444, () => console.log('magic on port 4444'));
