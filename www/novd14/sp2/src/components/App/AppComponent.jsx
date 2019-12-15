import React, { Component } from 'react';
import { SearchBar } from '../SearchBar';
import { VideoList } from '../VideoList';

class AppComponent extends Component {
  render() {
    const { videoDetail } = this.props;

    return (
      <div className="ui container">
        <SearchBar />
        {!videoDetail && <VideoList />}
        {videoDetail && 'Video detail'}
      </div>
    );
  }
}

export default AppComponent;
