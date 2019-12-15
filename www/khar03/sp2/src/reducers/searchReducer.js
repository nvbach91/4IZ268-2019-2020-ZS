import {SEARCH_SUCCESS, UPDATE_SEARCH_TERM} from '../logic/types';

const initialState = {
  term: null,
  result: null,
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
      };
    }

    default: {
      return {
        ...state,
      }
    }
  }
};


export default searchReducer;
