import React, {Component} from 'react';
import './VideoItem.scss';

class VideoItemComponent extends Component {
  render() {
    const { video, onClick } = this.props;

    return (
      <div className="video-item item" onClick={onClick}>
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
        />
        <div className="content">
          <div className="header">{video.snippet.title}</div>
        </div>
      </div>
    );
  }
}

export default VideoItemComponent;
