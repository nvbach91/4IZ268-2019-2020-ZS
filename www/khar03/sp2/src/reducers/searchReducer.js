import {
  INITIALIZE_APP,
  MARK_AS_FAVORITE,
  SEARCH_SUCCESS,
  SHOW_PHOTO_DETAIL,
  SORT_RESULTS,
  UPDATE_SEARCH_TERM
} from '../logic/types';

const initialState = {
  term: null,
  result: null,
  detail: null,
  favoriteImages: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_TERM: {
      return {
        ...state,
        term: action.payload,
      };
    }

    case SEARCH_SUCCESS: {
      return {
        ...state,
        result: action.payload,
        detail: null,
      };
    }

    case SORT_RESULTS: {
      return {
        ...state,
        result: action.payload,
      };
    }

    case SHOW_PHOTO_DETAIL: {
      return {
        ...state,
        detail: action.payload,
      };
    }

    case MARK_AS_FAVORITE: {
      const newDetail = state.detail.id === action.payload.id ? action.payload : state.detail;
      return {
        ...state,
        detail: {...newDetail},
      }
    }

    case INITIALIZE_APP: {
      return {
        ...state,
        favoriteImages: action.payload,
      }
    }

    default: {
      return {
        ...state,
      };
    }
  }
};


export default searchReducer;
