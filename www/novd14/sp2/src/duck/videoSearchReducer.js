import {
  SEARCHBAR_UPDATE_PHRASE,
  SEARCHING_VIDEOS_FAILURE,
  SEARCHING_VIDEOS_STARTED,
  SEARCHING_VIDEOS_SUCCESS,
  VIDEO_DETAIL_SELECT,
} from './types';

const initialState = {
  searchPhrase: null,
  isSearching: false,
  searchResult: null,
  videoDetail: null, // selected video
};

const VideoSearchReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEARCHBAR_UPDATE_PHRASE: {
      return {
        ...state,
        searchPhrase: action.payload,
      };
    }

    case SEARCHING_VIDEOS_STARTED: {
      return {
        ...state,
        isSearching: true,
        errorMessage: null,
        videoDetail: null,
      };
    }

    case SEARCHING_VIDEOS_SUCCESS: {
      return {
        ...state,
        isSearching: false,
        searchResult: action.payload,
      };
    }

    case SEARCHING_VIDEOS_FAILURE: {
      return {
        ...state,
        isSearching: false,
        errorMessage: null,
      };
    }

    case VIDEO_DETAIL_SELECT: {
      return {
        ...state,
        videoDetail: action.payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default VideoSearchReducer;
