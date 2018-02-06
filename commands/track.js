// Get the first tab with youtube open (should be the one where we're playing
// music).
const tab = 'chromix-too ls | grep youtube | head -n1 ';

// Assumes the output from the tab command is piped into this one, and it
// returns the ID of the tab with youtube open.
const ID = "cut -f 1 -d ' '";

// Inject some given JS code into the tab that is playing youtube.
const injectJS = js => `
  tab=$(${tab} | ${ID}); \\
  chromix-too raw 'chrome.tabs.executeScript' $tab '{"code": "${js.replace(/"/g, '\\"').replace(/'/g, "'\''")}"}'
`;


// List all open tabs on Chromium, get the first tab playing YouTube, get rid of
// the ID of the tab, strip the "- YouTube" part from the title of the tab,
// break the output in two lines, and reverse the order (so there's first the
// title and then the URL)
const info = () => `
  ${tab} | \\
  cut -f 1 -d ' ' --complement | \\
  sed 's/ - YouTube/\\n/' | \\
  sed 's/ /\\n🔊\t/' | \\
  sort -r
`;

// Use chromix-too to get the ID of the first tab that is playing YouTube, and
// then change the URL of that tab.
const change = url => `
  tab=$(${tab} | ${ID}); \\
  chromix-too raw 'chrome.tabs.update' $tab '{"url": "${url}"}'
`;

// Pause/Play the current song.
const pause =  () =>
  injectJS('document.querySelector(".ytp-play-button").click();');

// Goes back to the previous song.
const back =  () =>
  injectJS('history.back();');

// Skip the current song.
const next =  () =>
  injectJS('document.querySelector(".ytp-next-button").click();');


module.exports = {
  info,
  change,
  back,
  pause,
  next,
};
