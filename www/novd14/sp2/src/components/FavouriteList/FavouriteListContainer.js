import { connect } from 'react-redux';
import FavouriteListComponent from './FavouriteListComponent';
import {
  getFavouritesVideosAction,
  videoDetailSelectAction,
} from '../../duck/operations';

const mapStateToProps = (state) => ({
  favouriteVideos: state.videoSearch.favouriteVideos,
});

const mapDispatchToProps = (dispatch) => {
  const getFavouriteVideos = () => {
    dispatch(getFavouritesVideosAction());
  };

  const onVideoSelect = (video) => {
    dispatch(videoDetailSelectAction(video));
  };

  return {
    getFavouriteVideos,
    onVideoSelect,
  }
};

const FavouriteListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavouriteListComponent);

export default FavouriteListContainer;
