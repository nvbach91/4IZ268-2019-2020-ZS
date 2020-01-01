import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { VideoItem } from '../VideoItem';

const styles = {
  root: {
    margin: '25px auto',
  },
};

class VideoListComponent extends Component {
  renderVideos = (searchResult) => {
    const { onVideoSelect } = this.props;

    return searchResult.map((result) => {
      return (
        <VideoItem
          video={result}
          onVideoSelect={() => onVideoSelect(result)}
        />
      )
    });
  };

  render() {
    const { classes, searchResult } = this.props;
    if (searchResult && searchResult.length) {
      return (
        <div className={classes.root}>
          <h1>Nalezeno {searchResult.length} výsledků</h1>
          {this.renderVideos(searchResult)}
        </div>
      )
    }

    return (
      <></>
    );
  }
}

export default withStyles(styles)(VideoListComponent);
