import {
  SEARCHBAR_UPDATE_PHRASE,
  SEARCHING_VIDEOS_FAILURE,
  SEARCHING_VIDEOS_STARTED,
  SEARCHING_VIDEOS_SUCCESS,
  VIDEO_DETAIL_SELECT,
  GET_FAVOURITES_VIDEOS,
  SET_VIDEO_AS_FAVOURITE,
  SORTING_STARTED,
  SORT_BY_DATE,
} from './types';

const initialState = {
  searchPhrase: null,
  isSearching: false,
  searchResult: null,
  videoDetail: null, // selected video
  favouriteVideos: [],
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

    case GET_FAVOURITES_VIDEOS: {
      return {
        ...state,
        favouriteVideos: action.payload,
      };
    }

    case SET_VIDEO_AS_FAVOURITE: {
      return {
        ...state,
        favouriteVideos: action.payload,
      };
    }

    case SORTING_STARTED: {
      return {
        ...state,
        searchResult: null,
      }
    }

    case SORT_BY_DATE: {
      return {
        ...state,
        searchResult: action.payload,
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
