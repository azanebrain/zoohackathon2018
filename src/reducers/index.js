import { combineReducers } from 'redux';
import badgeText from './badgeText';
import categories from './categories';
import panels from './panels';
import match from './match';
import posts from './posts';
import settings from './settings';

export default combineReducers ({
  badgeText,
  categories,
  match,
  panels,
  posts,
  settings,
});
