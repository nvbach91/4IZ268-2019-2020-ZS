import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTermAction, searchImagesAction } from '../../logic/actions';
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
        <form
          onSubmit={this.onFormSubmit}
        >
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => updateTerm(e.target.value)}
              placeholder="Vyhledej image"
            />
          </div>

          <div>
            <button
              onClick={this.onFormSubmit}
            >
            </button>
          </div>
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
