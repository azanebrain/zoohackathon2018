import {combineReducers} from 'redux';
import count from './count';
import settings from './settings';
import panel from './panel';

export default combineReducers ({
  count,
  settings,
  panel,
});
