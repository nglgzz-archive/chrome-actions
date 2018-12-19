const express = require('express');
const URL = require('url').URL;
const axios = require('axios');
const { track } = require('../commands');
const { allowedDomains, trollSongs } = require('../constants');
const { errors, randomSong, youtubeSearch } = require('../utils');

const router = express.Router();

function addRoute(trackFn, resFn) {
  router.get(`/${trackFn}`, (req, res) => {
    track[trackFn]().then(data => res.send(resFn(data)));
  });
}

addRoute('getInfo', info => info);
addRoute('togglePlayPause', _ => 'The current song is now [un]paused.');
addRoute('toggleRepeat', _ => 'Toggled repeat for the current track.');
addRoute('playPrev', _ => "Here's the previous song.");
addRoute('playNext', _ => "Here's the next song.");
addRoute('goForward', _ => 'Skipped 5 seconds.');
addRoute('goBack', _ => 'Rewinded 5 seconds.');

router.get('/change', (req, res) => {
  // Check if the URL was specified.
  if (req.query.url && req.query.url !== 'null') {
    let { url } = req.query;

    // Check that the URL is valid.
    try {
      url = new URL(url);
    } catch (err) {
      // In this case the user didn't specify the URL, but just the song name.
      axios.get(youtubeSearch(url)).then(({ data }) => {
        const song = data.items[0];
        const songURL = `https://www.youtube.com/watch?v=${song.id.videoId}`;
        track
          .setURL(songURL)
          .then(() => res.send('Thank you for your song request!'));
      });
      // console.log(url);
      // res.send('You need to specify a valid link (did you forget "https://"?)');
      return;
    }

    // Check that the URL is from a whitelisted domain.
    if (!allowedDomains.includes(url.hostname)) {
      res.send('The URL specified is not allowed.');
      return;
    }

    // Add a chance for the person that is making the song request to be
    // trolled.
    const rnd = Math.random();
    if (rnd < 0.1) {
      const rndIndex = Math.floor(Math.random() * trollSongs.length);
      url = trollSongs[rndIndex];
    }

    track.setURL(url).then(() => res.send('Thank you for your song request!'));
    return;
  }

  // The URL was not specified, redirect to info, and return the current song's
  // name.
  res.redirect('/info');
});

router.get('/random', (req, res) => {
  randomSong().then(({ url, name }) => {
    if (!url) {
      res.send("Couldn't generate a random song. Try again.");
      return;
    }

    track.change(url).then(() => res.send(`Now playing: ${name}`));
  });
});

module.exports = router;
