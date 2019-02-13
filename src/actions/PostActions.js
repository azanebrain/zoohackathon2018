import APP from '../util/constants';

const fetchMedia = (media) => {
  var domain = 'https://2018zoohackathon.ajzane.com';
  return fetch(`${domain}/wp-json/wp/v2/media/${media}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json());
};

const WPRemoteGet = (endpoint, callback) => {
  var init = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const apiBase = `${APP.api.domain}${APP.api.basePath}`;

  fetch(`${apiBase}${endpoint}`, init)
  .then((response) => response.json() )
  .then((data) => callback(data))
  .catch(err => {
    console.log(err);
  });
}

const getPosts = () => {
  return new Promise(function(resolve, reject) {
    chrome.storage.local.get(['conconPosts'], (items) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      }else{
        resolve(items['conconPosts']);
      }
    });
  });
};

const getRelevantPosts = () => {
  // Show the posts which should be shown
  return new Promise(function(resolve, reject) {
    chrome.storage.sync.get('posts', function(data) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      }else{
        resolve(data.posts);
      }
    });
  });
};

export { fetchMedia, getPosts, getRelevantPosts, WPRemoteGet };
