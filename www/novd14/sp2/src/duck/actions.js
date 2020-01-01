import youtube from '../api/youtube';
import {
  SEARCHBAR_UPDATE_PHRASE,
  SEARCHING_VIDEOS_STARTED,
  SEARCHING_VIDEOS_SUCCESS,
  SEARCHING_VIDEOS_FAILURE,
  SEARCHING_VIDEOS_STOPPED,
  VIDEO_DETAIL_SELECT,
  GET_FAVOURITES_VIDEOS,
  SET_VIDEO_AS_FAVOURITE,
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
  youtube.get(`/search?q=${searchPhrase}`)
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

const getFavouritesVideos = () => (dispatch) => {
  const localStorage = window.localStorage;
  const key = 'favouriteVideos';

  dispatch({ type: GET_FAVOURITES_VIDEOS, payload: JSON.parse(localStorage.getItem(key)) || [] })
};

const setVideoAsFavourite = (videoDetail) => (dispatch) => {
  const localStorage = window.localStorage;
  const key = 'favouriteVideos';

  let favouriteVideos = JSON.parse(localStorage.getItem(key)) || [];
  const isVideoAlreadyFavourite = favouriteVideos.filter((video) => video.id.videoId === videoDetail.id.videoId)[0];
  if (isVideoAlreadyFavourite) {
    favouriteVideos = favouriteVideos.filter((video) => video.id.videoId !== videoDetail.id.videoId)
  } else {
    favouriteVideos.push(videoDetail);
  }

  localStorage.setItem(key, JSON.stringify(favouriteVideos));
  dispatch({ type: SET_VIDEO_AS_FAVOURITE, payload: favouriteVideos })
};

export {
  updateSearchPhrase,
  searchVideos,
  videoDetailSelect,
  getFavouritesVideos,
  setVideoAsFavourite,
}
