import { connect } from 'react-redux';
import VideoListComponent from './VideoListComponent';
import { videoDetailSelectAction, sortByDateAction } from '../../duck/operations';

const mapStateToProps = (state) => ({
  searchResult: state.videoSearch.searchResult,
});

const mapDispatchToProps = (dispatch) => {
  const onVideoSelect = (video) => {
    dispatch(videoDetailSelectAction(video));
  };

  const sortByDate = () => {
    dispatch(sortByDateAction());
  };

  return {
    onVideoSelect,
    sortByDate,
  }
};

const VideoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoListComponent);

export default VideoListContainer;
