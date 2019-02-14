import {combineReducers} from 'redux';
import categories from './categories';
import count from './count';
import panels from './panels';
import posts from './posts';
import settings from './settings';

export default combineReducers ({
  categories,
  count,
  panels,
  posts,
  settings,
});
