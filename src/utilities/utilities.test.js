import {
  clearBadgeCount,
  contentMutations,
  sizeImage,
  setBadgeCount,
  setBadgeToBadColor,
  setBadgeToGoodColor,
  setBadgeToMediumColor,
} from './utilities';

describe('sizeImage by modifying the jetpack url', () => {
  it('should return a modified url width and height of 100', () => {
    const featuredMediaUrl =
      'https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?fit=2560%2C1693&ssl=1';
    expect(sizeImage(featuredMediaUrl, 100, 100)).toBe(
      'https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/animal-ape-calm-52530.jpg?fit=100%2C100&ssl=1',
    );
  });
});

describe('setBadgeCount', () => {
  it('should set the icon text to 90', () => {
    const badgeCount = 90;
    setBadgeCount(badgeCount);
    expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({ text: badgeCount.toString() });
  });

  it('should be "999+" when greater than 999', () => {
    setBadgeCount(1000);
    expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({ text: '999+' });
  });
});

describe('clearBadgeCount', () => {
  it('should set badge text to empty string', () => {
    clearBadgeCount();
    expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({ text: '' });
  });
});

describe('setBadgeToBadColor', () => {
  it('should set badge color to red', () => {
    setBadgeToBadColor();
    expect(chrome.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith({
      color: [255, 0, 0, 128],
    });
  });
});

describe('setBadgeToGoodColor', () => {
  it('should set badge color to green', () => {
    setBadgeToGoodColor();
    expect(chrome.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith({
      color: [0, 255, 0, 128],
    });
  });
});

describe('setBadgeToMediumColor', () => {
  it('should set badge color to blue', () => {
    setBadgeToMediumColor();
    expect(chrome.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith({
      color: [0, 0, 255, 128],
    });
  });
});

jest.useFakeTimers();

// contentMutations fires a callback when mutations have stopped.
describe('contentMutations', () => {
  document.body.innerHTML = '<h1>Title</h1>';

  it('should trigger callback after 50ms of idle dom', () => {
    const callback = jest.fn();

    contentMutations(callback, 50);

    expect(callback).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our callback should have been called!
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
