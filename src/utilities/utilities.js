import APP from './constants';

export function WPRemoteGet(endpoint, callback) {
  const init = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const apiBase = `${APP.api.domain}${APP.api.basePath}`;

  fetch(`${apiBase}${endpoint}`, init)
    .then(response => response.json())
    .then(data => callback(data))
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Adds a number to the badge
 *
 * @param {number} count The number to set in the badge
 */
export function setBadgeCount(count) {
  // Can only support 4 digits
  if (count > 999) {
    count = '999+';
  }

  chrome.browserAction.setBadgeText({
    text: count.toString(),
  });
}

/**
 * Clears the count from the badge
 */
export function clearBadgeCount() {
  console.log('clearing');
  // set text to '' to remove the badge
  chrome.browserAction.setBadgeText({ text: '' });
}

export function setBadgeToBadColor() {
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 128] });
}

export function setBadgeToGoodColor() {
  chrome.browserAction.setBadgeBackgroundColor({ color: [0, 255, 0, 128] });
}

export function setBadgeToMediumColor() {
  chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 128] });
}

// measure the time between mutations
export function contentMutations(cb) {
  // Select the node that will be observed for mutations
  const targetNode = document.body;
  const targetTime = 1000; // 1 second
  let timeOfMutation = Date.now();

  let interval;
  let observer;

  function disconnectObserver() {
    // Later, you can stop observing
    observer.disconnect();
  }

  function measureMutations() {
    const now = Date.now();
    const timeOffset = now - timeOfMutation;
    console.log(now - timeOfMutation);
    if (timeOffset > targetTime) {
      console.log('disconnecting');
      clearInterval(interval);
      disconnectObserver();
      cb();
    }
  }
  observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
        console.log('A child node has been added or removed.');
        timeOfMutation = Date.now();
        clearInterval(interval);
        interval = setInterval(measureMutations, 400);
      }
    });
  });

  interval = setInterval(measureMutations, 400);

  // Options for the observer (which mutations to observe)
  const config = { attributes: false, childList: true, subtree: true };

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  return {
    disconnectObserver,
  };
}
