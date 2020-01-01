import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Container, Grid, Fab } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const styles = {
  root: {
    margin: '25px 0',
  },
  otherVideo: {
    margin: '0 auto',
    display: 'table',
  },
  otherVideoImage: {
    borderRadius: '5px',
    width: '100%',
  },
  otherVideoTitle: {
    marginBottom: '15px',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  videoDetail: {
    marginBottom: '50px',
  },
  video: {
    height: '400px',
    width: '100%',
  },
  infoHolder: {
    position: 'relative',
    marginBottom: '25px',
  },
  favouriteIcon: {
    position: 'absolute',
    right: 0,
    top: '-10px',
  },
};

class VideoDetailComponent extends Component {
  componentDidMount() {
    const { getFavouriteVideos } = this.props;
    getFavouriteVideos();
  }

  renderVideoDetail = (videoDetail) => {
    const { classes, setVideoAsFavourite, favouriteVideos } = this.props;
    const videoSrc = `https://www.youtube.com/embed/${videoDetail.id.videoId}`;
    const isVideoFavourite = favouriteVideos.filter(video => video.id.videoId === videoDetail.id.videoId)[0];

    return (
      <div className={classes.videoDetail}>
        <iframe className={classes.video} src={videoSrc} />
        <div className={classes.infoHolder}>
          <p>{videoDetail.snippet.channelTitle}</p>
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            className={classes.favouriteIcon}
            onClick={() => setVideoAsFavourite(videoDetail)}
          >
            {isVideoFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Fab>
        </div>
        <h1>{videoDetail.snippet.title}</h1>
        <p>{videoDetail.snippet.description}</p>
      </div>
    );
  };

  renderSearchedVideos = (videoDetail, videos) => {
    const { classes, onVideoSelect } = this.props;

    if (videos && videos.length) {
      return videos
        .filter(video => video.id.videoId !== videoDetail.id.videoId)
        .map((video) => {
          return (
            <Grid container className={classes.otherVideo}>
              <Grid item xs={12}>
                <img
                  className={classes.otherVideoImage}
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                />
              </Grid>
              <Grid item xs={12}>
                <h3
                  className={classes.otherVideoTitle}
                  onClick={() => onVideoSelect(video)}
                >
                  {video.snippet.title}
                </h3>
              </Grid>
            </Grid>
          );
        });
    }

    return <></>;
  };

  render() {
    const { classes, videoDetail, searchResultVideos } = this.props;

    if (!videoDetail) {
      return <></>;
    }

    return (
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            {this.renderVideoDetail(videoDetail)}
          </Grid>
          <Grid item xs={12} md={3}>
            {this.renderSearchedVideos(videoDetail, searchResultVideos)}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(VideoDetailComponent);
