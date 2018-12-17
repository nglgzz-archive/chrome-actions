const { Tabs } = require('chromix-three');

// Get the first pinned tab with LOR or YouTube open (should be the one where
// we're playing music).
const getTab = async () => {
  return (await Tabs.filter(
    { pinned: true },
    { url: /listenonrepeat|youtube/i },
  ))[0];
};

// Get the name of the song playing by taking the title of the tab and stripping
// YouTube/ListenOnRepeat.
const info = () =>
  getTab().then(({ info }) =>
    info.title.replace(/ - (YouTube|ListenOnRepeat)/, ''),
  );

const change = url => getTab().then(tab => tab.setURL(url));

const pause = async () => {
  const tab = await getTab();

  if (/listenonrepeat/.test(tab.info.url)) {
    return tab.executeScript('LOR.player.actions.togglePlayPause()', true);
  }

  return tab.executeScript(
    'document.querySelector(".ytp-play-button").click()',
  );
};

const back = async () => {
  const tab = await getTab();

  if (/listenonrepeat/.test(tab.info.url)) {
    return tab.executeScript('LOR.player.actions.playPrev()', true);
  }

  return tab.goBack();
};

const next = async () => {
  const tab = await getTab();

  if (/listenonrepeat/.test(tab.info.url)) {
    return tab.executeScript('LOR.player.actions.playNext()', true);
  }

  return tab.executeScript(
    'document.querySelector("ytd-compact-video-renderer.ytd-watch-next-secondary-results-renderer a").click();',
  );
};

module.exports = {
  info,
  change,
  back,
  pause,
  next,
};
