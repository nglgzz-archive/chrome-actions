const { Tabs } = require('chromix-three');
const { APIError } = require('../utils/errors');

const PATTERN_ALL = /listenonrepeat|youtube/i;
const PATTERN_LOR = /listenonrepeat/i;
const PATTERN_YT = /youtube/i;

const ytAction = (tab, str) =>
  tab.executeScript(`document.querySelector("${str}").click()`);
const lorAction = (tab, str) =>
  tab.executeScript(`LOR.player.actions.${str}`, true);

// Get the first pinned tab with Youtube or LOR open
async function getTab() {
  const tabs = await Tabs.filter({ pinned: true }, { url: PATTERN_ALL });

  if (tabs.length === 0) {
    throw new APIError(500, 'Music tab not found');
  }

  return tabs[0];
}

async function getInfo() {
  const { info } = await getTab();
  return info.title.replace(/ - (YouTube|ListenOnRepeat)/, '');
}

async function setURL(url) {
  const tab = await getTab();
  return tab.setUrl(url);
}

async function togglePlayPause() {
  const tab = await getTab();

  if (PATTERN_LOR.test(tab.info.url)) {
    return lorAction(tab, 'togglePlayPause()');
  }

  return ytAction(tab, '.ytp-play-button');
}

async function playPrev() {
  const tab = await getTab();

  if (PATTERN_LOR.test(tab.info.url)) {
    return lorAction(tab, 'playPrev()');
  }

  return tab.goBack();
}

async function playNext() {
  const tab = await getTab();

  if (PATTERN_LOR.test(tab.info.url)) {
    return lorAction(tab, 'playNext()');
  }

  return ytAction(tab, '.ytd-watch-next-secondary-results-renderer a');
}

async function toggleRepeat() {
  const tab = await getTab();
  const { url } = tab.info;

  if (PATTERN_LOR.test(url)) {
    return tab.setURL(url.replace('listenonrepeat', 'youtube'));
  }

  return tab.setURL(url.replace('youtube', 'listenonrepeat'));
}

module.exports = {
  getInfo,
  togglePlayPause,
  toggleRepeat,
  setURL,
  playPrev,
  playNext,
};
