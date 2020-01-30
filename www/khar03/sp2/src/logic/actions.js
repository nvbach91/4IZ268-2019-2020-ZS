import {
  UPDATE_SEARCH_TERM,
  SEARCH_STARTED,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_STOPPED,
  SORT_RESULTS,
  SHOW_PHOTO_DETAIL,
  MARK_AS_FAVORITE,
  INITIALIZE_APP,
} from './types';
import superagent from 'superagent';
const localStorageKey = 'favoritePhotos';

const updateTermAction = (term) => (dispatch) => {
  dispatch({ type: UPDATE_SEARCH_TERM, payload: term });
};

const mapImageDTOToObject = (dto) => {
  return dto.map((image) => {
    const newImageObject = Object.create(null);

    newImageObject.id = image.id;
    newImageObject.urls = image.urls;
    newImageObject.description = image.description;
    newImageObject.alt_description = image.alt_description;
    newImageObject.likes = image.likes;
    newImageObject.user = {
      name: image.user.name,
      instagram_username: image.user.instagram_username,
      twitter_username: image.user.twitter_username,
    };

    return newImageObject;
  });
};

const searchImagesAction = () => (dispatch, getState) => {
  const { term } = getState().search;
  const imagesPerPage = 24;

  dispatch({ type: SEARCH_STARTED });
  superagent
    .get(`https://api.unsplash.com/search/photos?query=${term}&per_page=${imagesPerPage}&client_id=e444103ccb697612b0e4a0ad122bcb8f69dc063237bb31f8ee5e3720a51a7007`)
    .then((data) => {
      const imageResponse = mapImageDTOToObject(data.body.results);

      const favoriteImages = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
      const favoriteImagesKeys = favoriteImages.map((image) => image.id);
      imageResponse.forEach((result) => {
        if (favoriteImagesKeys.includes(result.id)) {
          result.isFavorite = true;
        }
      });
      dispatch({ type: SEARCH_SUCCESS, payload: imageResponse })
    })
    .catch((error) => {
      dispatch({ type: SEARCH_FAILURE, payload: error });
    })
    .then(() => {
      dispatch({ type: SEARCH_STOPPED });
    })
};


const sortResultsAction = (direction) => (dispatch, getState) => {
  const { result } = getState().search;
  let sortedResults = [];
  if (direction === 'most') {
    // sestupne
    sortedResults = [...result]
      .sort((photo1, photo2) => {
        const a = photo1.likes;
        const b = photo2.likes;
        return a > b ? -1 : a < b ? 1 : 0;
      });
  } else if (direction === 'least') {
    // vzestupne
    sortedResults = [...result]
      .sort((photo1, photo2) => {
        const a = photo1.likes;
        const b = photo2.likes;
        return a < b ? -1 : a > b ? 1 : 0;
      });
  } else {
    // netridime
    sortedResults = [...result];
  }
  dispatch({ type: SORT_RESULTS, payload: sortedResults });
};

const showPhotoDetailAction = (photo) => (dispatch) => {
  dispatch({ type: SHOW_PHOTO_DETAIL, payload: photo })
};

const markAsFavoriteAction = (photo) => (dispatch) => {
  const localStorage = window.localStorage;
  const favoritePhotosFromStorage = localStorage.getItem(localStorageKey);
  const favoritePhotos = JSON.parse(favoritePhotosFromStorage) || [];

  const isAlreadyFavorite = !!favoritePhotos.filter((image) => image.id === photo.id).length;
  if (isAlreadyFavorite) {
    photo.isFavorite = !photo.isFavorite;
    const newFavoritePhotos = favoritePhotos.filter((image) => image.id !== photo.id);
    localStorage.setItem(localStorageKey, JSON.stringify(newFavoritePhotos));
    dispatch(initializeAppAction(newFavoritePhotos));
  } else {
    photo.isFavorite = !photo.isFavorite;
    favoritePhotos.push(photo);
    localStorage.setItem(localStorageKey, JSON.stringify(favoritePhotos));
    dispatch(initializeAppAction(favoritePhotos));
  }

  dispatch({ type: MARK_AS_FAVORITE, payload: photo });
};

const initializeAppAction = (favoriteImages = []) => (dispatch) => {
  if (!favoriteImages.length) {
    favoriteImages = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
  }

  dispatch({ type: INITIALIZE_APP, payload: favoriteImages });
};

export {
  updateTermAction,
  searchImagesAction,
  sortResultsAction,
  showPhotoDetailAction,
  markAsFavoriteAction,
  initializeAppAction,
};
