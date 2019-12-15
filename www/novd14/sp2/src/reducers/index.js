import { combineReducers } from 'redux';
import VideoSearchReducer from '../duck/videoSearchReducer';

const combinedReducers = combineReducers({
  videoSearch: VideoSearchReducer,
});

export default combinedReducers;
