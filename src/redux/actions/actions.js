// actions
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET_COUNT = 'RESET_COUNT';
const ADD_COMMENT = 'ADD_COMMENT';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

const ADD_POST = 'ADD_POST';
const ADD_POSTS = 'ADD_POSTS';
const TOGGLE_POST = 'TOGGLE_POST';

const ADD_CATEGORY = 'ADD_CATEGORY';
const ADD_CATEGORIES = 'ADD_CATEGORIES';

const CATEGORY_MATCH = 'CATEGORY_MATCH';
const RESET_MATCHES = 'RESET_MATCHES';

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

export const addComment = (author, comment, postId) => ({
  type: ADD_COMMENT,
  postId,
  author,
  comment,
});

export const removeComment = (index, postId) => ({
  type: REMOVE_COMMENT,
  index,
  postId,
});

export const categoryMatch = id => ({
  type: CATEGORY_MATCH,
  id,
  isActive: false,
});

export const resetMatches = () => ({
  type: RESET_MATCHES,
});

export const addCategories = (categories = []) => ({
  type: ADD_CATEGORIES,
  categories,
});

export const addCategory = (
  description,
  id,
  link,
  name,
  parent,
  slug,
) => ({
  type: ADD_CATEGORY,
  description,
  id,
  link,
  name,
  parent,
  slug,
});

export const addPosts = (posts = []) => ({
  type: ADD_POSTS,
  posts,
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
