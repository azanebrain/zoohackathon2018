// actions
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET_COUNT = 'RESET_COUNT';

export const ADD_POST = 'ADD_POST';
export const TOGGLE_POST = 'TOGGLE_POST';

export const ADD_CATEGORY = 'ADD_CATEGORY';

export const CATEGORY_MATCH = 'CATEGORY_MATCH';
export const RESET_MATCHES = 'RESET_MATCHES';

const TOGGLE_BUTTON = 'TOGGLE_BUTTON';

const PAGE = 'PAGE';

// action creators
export const increment = (amount = 1) => ({
  type: INCREMENT,
  amount,
});

export const decrement = (amount = 1) => ({
  type: DECREMENT,
  amount: -amount,
});

export const resetCount = () => ({
  type: RESET_COUNT,
});

export const categoryMatch = id => ({
  type: CATEGORY_MATCH,
  id,
  isActive: false,
});

export const resetMatches = () => ({
  type: RESET_MATCHES,
});

export const addCategory = (description, id, link, name, parent, slug) => ({
  type: ADD_CATEGORY,
  description,
  id,
  link,
  name,
  parent,
  slug,
});

export const addPost = (
  categories,
  content,
  date,
  excerpt,
  id,
  jetpack_featured_media_url,
  modified,
  slug,
  title,
  isActive = false,
) => ({
  type: ADD_POST,
  categories,
  content,
  date,
  excerpt,
  id,
  jetpack_featured_media_url,
  modified,
  slug,
  title,
  isActive,
});

export const togglePost = postId => ({
  type: TOGGLE_POST,
  postId,
});

export const pageStatus = (active, incognito, status, title, url) => ({
  type: PAGE,
  active,
  incognito,
  status,
  title,
  url,
});

export const toggleButton = button => ({
  type: TOGGLE_BUTTON,
  button,
});
