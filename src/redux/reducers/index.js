import { combineReducers } from 'redux';

// reducers
import categories from './categories';
import count from './count';
import matches from './matches';
import page from './page';
import posts from './posts';
import settings from './settings';


export default combineReducers({
  categories,
  count,
  matches,
  page,
  posts,
  settings,
});
