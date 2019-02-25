import throttle from 'lodash/throttle';

import store from './store';
import { setBadgeCount, WPRemoteGet } from '../../utilities/utilities';
import {
  addPost,
  addCategory,
  pageStatus,
} from '../../redux/actions/actions';

const shouldGetPosts = Object.keys(store.getState().posts).length === 0;
const shouldGetCategories = Object.keys(store.getState().categories).length === 0;

let previousCount = store.getState().count;
let categoryMatches = store.getState().matches;
let previousStatus = store.getState().page;

store.subscribe(throttle(() => {
  const { count: { count }, matches, page } = store.getState();
  if (count !== previousCount) {
    setBadgeCount(count);
    previousCount = count;
  }

  if (matches !== categoryMatches) {
    console.log('categoryMatches', matches);
    categoryMatches = matches;
  }

  if (page !== previousStatus) {
    console.log('pageStatus', page);
    previousStatus = page;
  }

  console.log(store.getState());
}, 400));

if (shouldGetPosts) {
  WPRemoteGet('/posts/', (posts) => {
    posts.map((post) => {
      const {
        categories,
        content: { rendered: content },
        date,
        excerpt: { rendered: excerpt },
        id,
        jetpack_featured_media_url,
        modified,
        slug,
        title: { rendered: title },
      } = post;
      store.dispatch(
        addPost(
          categories,
          content,
          date,
          excerpt,
          id,
          jetpack_featured_media_url,
          modified,
          slug,
          title,
        ),
      );
      return post;
    });
    console.log('store state after add posts', store.getState());
  });
}
if (shouldGetCategories) {
  WPRemoteGet('/categories?per_page=100', (categories) => {
    // ignore the 'Uncategorized' category.
    const filtered = categories.filter(category => category.name !== 'Uncategorized');

    filtered.map((category) => {
      const {
        description,
        id,
        link,
        name,
        parent,
        slug,
      } = category;
      store.dispatch(
        addCategory(
          description,
          id,
          link,
          name,
          parent,
          slug,
        ),
      );
      return category;
    });
    console.log('store state after add category', store.getState());
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  store.dispatch(pageStatus(tab.active, tab.incognito, tab.status, tab.title, tab.url));
});
