const express = require('express');
const URL = require('url').URL;
const axios = require('axios');
const { track } = require('../commands');
const { allowedDomains, trollSongs } = require('../constants');
const { errors, randomSong, youtubeSearch } = require('../utils');

const router = express.Router();

router.get('/info', (req, res) => {
  track.info().then(info => res.send(info));
});

router.get('/pause', (req, res) => {
  track.pause().then(() => res.send('The current song is now [un]paused!'));
});

router.get('/back', (req, res) => {
  track.back().then(() => res.send("Here's the last song!"));
});

router.get('/next', (req, res) => {
  track.next().then(() => res.send("Here's the next song!"));
});

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
        console.log(songURL);
        track
          .change(songURL)
          .then(() => res.send('Thank you for your song request!'));
      });
      // console.log(url);
      // res.send('You need to specify a valid link (did you forget "https://"?)');
      return;
    }

    // Check that the URL is a youtube URL.
    if (!allowedDomains.includes(url.hostname)) {
      res.send('Only YouTube links are allowed.');
      return;
    }

    // Add a chance for the person that is making the song request to be
    // trolled.
    const rnd = Math.random();
    if (rnd < 0.1) {
      const rndIndex = Math.floor(Math.random() * trollSongs.length);
      url = trollSongs[rndIndex];
    }

    track.change(url).then(() => res.send('Thank you for your song request!'));
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
