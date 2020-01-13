import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Button, Container } from '@material-ui/core';
import { VideoItem } from '../VideoItem';

const styles = {
  root: {
    margin: '25px auto',
  },
  sortButton: {
    float: 'right',
    marginTop: '-50px',
  },
};

class VideoListComponent extends Component {
  renderVideos = (searchResult) => {
    const { classes, onVideoSelect, sortByDate } = this.props;

    const searchResults = searchResult.map((result) => (
      <VideoItem
        video={result}
        onVideoSelect={() => onVideoSelect(result)}
      />
    ));

    return (
      <>
        <Button
          variant="outlined"
          onClick={sortByDate}
          className={classes.sortButton}
        >
          Seřadit od nejnovějšího
        </Button>
        {searchResults}
      </>
    );
  };

  render() {
    const { classes, searchResult } = this.props;
    if (searchResult && searchResult.length) {
      return (
        <Container className={classes.root}>
          <h1>Nalezeno {searchResult.length} výsledků</h1>
          {this.renderVideos(searchResult)}
        </Container>
      )
    }

    return (
      <></>
    );
  }
}

export default withStyles(styles)(VideoListComponent);
