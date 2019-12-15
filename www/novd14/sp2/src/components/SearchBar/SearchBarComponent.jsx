import React, { Component } from 'react';
import './SearchBar.scss';

class SearchBarComponent extends Component {
  onFormSubmit = (event) => {
    event.preventDefault();

    const { searchVideos } = this.props;
    searchVideos();
  };

  render() {
    const { searchPhrase, updateSearchPhrase, isSearching } = this.props;
    return (
      <div className="ui segment search-bar">
        <form
          onSubmit={this.onFormSubmit}
          className="ui form grid"
        >
          <div className="ui row">
            <div className="fourteen wide centered column">
              <div className="field">
                <input
                  type="text"
                  value={searchPhrase}
                  onChange={(e) => updateSearchPhrase(e.target.value)}
                  placeholder="Vyhledej video"
                />
              </div>
            </div>
            <div className="two wide centered column">
              <div className="field">
                <button
                  className={`ui primary ${isSearching ? 'loading' : ''} ${isSearching || !searchPhrase ? 'disabled' : 'active'} button`}
                  onClick={this.onFormSubmit}
                >
                  {isSearching ? 'Loading' : 'Hledej'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBarComponent;
