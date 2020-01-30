import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTermAction, searchImagesAction } from '../../logic/actions';
import { TextField } from '@material-ui/core';
import './SearchBar1.css';

class SearchBar1 extends Component {
  onFormSubmit = (event) => {
    event.preventDefault();

    const { searchImages } = this.props;
    searchImages();
  };

  render() {
    const { searchTerm, updateTerm } = this.props;
    return (
      <>
        <form onSubmit={this.onFormSubmit}>
            <TextField
              label="Search for images..."
              variant="filled"
              value={searchTerm}
              onChange={(e) => updateTerm(e.target.value)}
              className="searchbar"
            />
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  searchTerm: state.search.term,
});

const mapDispatchToProps = (dispatch) => {
  const updateTerm = (term) => {
    dispatch(updateTermAction(term));
  };

  const searchImages = () => {
    dispatch(searchImagesAction());
  };

  return {
    updateTerm,
    searchImages,
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar1);
