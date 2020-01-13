import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { VideoItem } from '../VideoItem';

class FavouriteListComponent extends Component {
  componentDidMount() {
    const { getFavouriteVideos} = this.props;
    getFavouriteVideos();
  }

  renderFavouriteVideos = (videos) => {
    if (videos.length) {
      const { onVideoSelect } = this.props;

      return videos.map((video) => (
        <VideoItem
          video={video}
          onVideoSelect={() => onVideoSelect(video)}
        />
      ));
    }

    return <p>Nemáte v seznamu žádná oblíbená videa</p>;
  };

  render() {
    const { favouriteVideos } = this.props;

    return (
      <Container>
        <h2>Vaše oblíbená videa</h2>
        {this.renderFavouriteVideos(favouriteVideos)}
      </Container>
    )
  }
}

export default FavouriteListComponent;
