import {
  UPDATE_SEARCH_TERM,
  SEARCH_STARTED,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_STOPPED,
} from './types';
import superagent from 'superagent';

const updateTermAction = (term) => (dispatch) => {
  dispatch({ type: UPDATE_SEARCH_TERM, payload: term });
};

const searchImagesAction = () => (dispatch, getState) => {
  const { term } = getState().search;
  const imagesPerPage = 25;

  dispatch({ type: SEARCH_STARTED });
  superagent
    .get(`https://api.unsplash.com/search/photos?query=${term}&per_page=${imagesPerPage}&client_id=e444103ccb697612b0e4a0ad122bcb8f69dc063237bb31f8ee5e3720a51a7007`)
    .then((data) => {
      dispatch({ type: SEARCH_SUCCESS, payload: data.body.results })
    })
    .catch((error) => {
      dispatch({ type: SEARCH_FAILURE, payload: error });
    })
    .then(() => {
      dispatch({ type: SEARCH_STOPPED });
    })
};

export {
  updateTermAction,
  searchImagesAction,
}
