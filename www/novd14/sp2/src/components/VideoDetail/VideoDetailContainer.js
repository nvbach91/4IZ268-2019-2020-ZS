import { connect } from 'react-redux';
import VideoDetailComponent from './VideoDetailComponent';
import {
  videoDetailSelectAction,
  getFavouritesVideosAction,
  setVideoAsFavouriteAction,
} from '../../duck/operations';

const mapStateToProps = (state) => ({
  searchResultVideos: state.videoSearch.searchResult,
  favouriteVideos: state.videoSearch.favouriteVideos,
});

const mapDispatchToProps = (dispatch) => {
  const onVideoSelect = (video) => {
    dispatch(videoDetailSelectAction(video));
  };

  const getFavouriteVideos = () => {
    dispatch(getFavouritesVideosAction());
  };

  const setVideoAsFavourite = (video) => {
    dispatch(setVideoAsFavouriteAction(video));
  };

  return {
    onVideoSelect,
    getFavouriteVideos,
    setVideoAsFavourite,
  }
};

const VideoDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoDetailComponent);

export default VideoDetailContainer;
