const axios = require('axios');
const randomWords = require('random-words');

const sleep = ms => new Promise(res => setTimeout(res, ms));

const getSongName = async () => {
  let query;

  while (!query) {
    query = randomWords().substr(0,4);
    const { data } = await axios.get(`http://musicbrainz.org/ws/2/work?query=${query}&fmt=json`);
    const song = data.works.find((work) => {
      work.artist = (work.relations.find(rel => !!rel.artist) || {}).artist;

      if (work.title && work.artist) {
        return true;
      }

      return false;
    });

    if (song) {
      query = `${song.title} ${song.artist.name}`;
    } else {
      query = '';
    }
  }

  return query;
};


const youtubeSearch = query => `https://www.youtube.com/results?search_query=${query}`;
const getSongUrl = async (name) => {
  const { data } = await axios.get(youtubeSearch(name), {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36',
    }
  });

  const results = data.match(/"contents":(\[{"videoRenderer":.*}\]),"continuations"/);
  if (!results) {
    return null;
  }

  const video = JSON.parse(results[1])[0].videoRenderer;
  return `https://youtube.com/watch?v=${video.videoId}`;
};

const randomSong = async () => {
  let attemts = 0;
  let url;
  let name;

  while (!url && attemts < 2) {
    attemts += 1;
    if (url !== undefined) {
      await sleep(1000);
    }

    try {
      name = await getSongName();
      url = await getSongUrl(name);
    } catch (err) {
      url = null;
    }
  }

  return {
    url,
    name,
  };
};


module.exports = randomSong;

