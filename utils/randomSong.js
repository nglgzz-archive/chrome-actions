const axios = require('axios');
const randomWords = require('random-words');

// This assumes that you have a YOUTUBE_API_KEY, with an api key generated from
// here https://console.developers.google.com/apis
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const youtubeSearch = query =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${query}&type=video&videoCategoryId=10&key=${YOUTUBE_API_KEY}`;


const randomSong = async () => {
  const query = randomWords();
  const { data } = await axios.get(youtubeSearch(query));
  const rndIndex = Math.floor(Math.random() * data.items.length);
  const song = data.items[rndIndex];

  return {
    name: song.snippet.title,
    url: `https://www.youtube.com/watch?v=${song.id.videoId}`,
  };
};


module.exports = randomSong;

