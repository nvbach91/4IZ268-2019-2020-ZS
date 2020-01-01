import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Grid, Divider } from '@material-ui/core';

const styles = {
  root: {
    marginBottom: '20px',
  },
  videoImage: {
    width: '100%',
    borderRadius: '5px',
  },
  content: {

  },
  videoTitle: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
};

class VideoItemComponent extends Component {
  render() {
    const { classes, video, onVideoSelect } = this.props;

    return (
      <Grid
        className={classes.root}
        container
        spacing={2}
      >
        <Grid item xs={12} md={5}>
          <img
            className={classes.videoImage}
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <div className={classes.content}>
            <h2
              onClick={onVideoSelect}
              className={classes.videoTitle}
            >
              {video.snippet.title}
            </h2>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(VideoItemComponent);
