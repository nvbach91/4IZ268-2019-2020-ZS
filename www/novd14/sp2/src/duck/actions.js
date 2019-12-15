import youtube from '../api/youtube';
import {
  SEARCHBAR_UPDATE_PHRASE,
  SEARCHING_VIDEOS_STARTED,
  SEARCHING_VIDEOS_SUCCESS,
  SEARCHING_VIDEOS_FAILURE,
  SEARCHING_VIDEOS_STOPPED,
  VIDEO_DETAIL_SELECT,
} from './types';

const updateSearchPhrase = (searchPhrase) => (dispatch) => {
  dispatch({ type: SEARCHBAR_UPDATE_PHRASE, payload: searchPhrase });
};

const searchVideos = () => (dispatch, getState) => {
  const { isSearching, searchPhrase } = getState().videoSearch;
  if (isSearching || searchPhrase.length === 0) {
    return;
  }

  dispatch({ type: SEARCHING_VIDEOS_STARTED });
  youtube.get('/search/', { q: searchPhrase })
    .then((data) => {
      dispatch({ type: SEARCHING_VIDEOS_SUCCESS, payload: data.data.items });
    })
    .catch((error) => {
      dispatch({ type: SEARCHING_VIDEOS_FAILURE, payload: error.message })
    })
    .then(() => {
      dispatch({ type: SEARCHING_VIDEOS_STOPPED });
    })
};

const videoDetailSelect = (video) => (dispatch) => {
  if (video) {
    dispatch({ type: VIDEO_DETAIL_SELECT, payload: video});
  }
};

export {
  updateSearchPhrase,
  searchVideos,
  videoDetailSelect,
}
