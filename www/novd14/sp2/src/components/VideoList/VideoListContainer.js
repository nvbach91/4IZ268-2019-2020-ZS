import { connect } from 'react-redux';
import VideoListComponent from './VideoListComponent';
import { videoDetailSelectAction } from '../../duck/operations';

const mapStateToProps = (state) => ({
  searchResult: state.videoSearch.searchResult,
});

const mapDispatchToProps = (dispatch) => {
  const onVideoSelect = (video) => {
    dispatch(videoDetailSelectAction(video));
  };

  return {
    onVideoSelect,
  }
};

const VideoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoListComponent);

export default VideoListContainer;
