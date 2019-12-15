import React, {Component} from 'react';
import { VideoItem } from '../VideoItem';

class VideoListComponent extends Component {
  renderVideos = (searchResult) => {
    const { onVideoSelect } = this.props;

    return searchResult.map((result) => {
      return (
        <VideoItem
          video={result}
          onClick={() => onVideoSelect(result)}
        />
      )
    });
  };

  render() {
    const { searchResult } = this.props;
    if (searchResult && searchResult.length > 0) {
      return (
        <div className="ui relaxed divided list">
          {`I have ${searchResult.length} videos`}
          {this.renderVideos(searchResult)}
        </div>
      )
    }

    return (
      <></>
    );
  }
}

export default VideoListComponent;
