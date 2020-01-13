import { connect } from 'react-redux';
import SearchBarComponent from './SearchBarComponent';
import { updateSearchPhraseAction, searchVideosAction } from '../../duck/operations';

const mapStateToProps = (state) => ({
  searchPhrase: state.videoSearch.searchPhrase,
  isSearching: state.videoSearch.isSearching,
});

const mapDispatchToProps = (dispatch) => {
  const updateSearchPhrase = (searchPhrase) => {
    dispatch(updateSearchPhraseAction(searchPhrase));
  };

  const searchVideos = () => {
    dispatch(searchVideosAction());
  };

  return {
    updateSearchPhrase,
    searchVideos,
  };
};

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBarComponent);

export default SearchBarContainer;
