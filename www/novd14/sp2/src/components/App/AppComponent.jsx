import React, { Component } from 'react';
import {Paper, withStyles} from '@material-ui/core';
import { Container, Grid } from '@material-ui/core';
import { SearchBar } from '../SearchBar';
import { VideoList } from '../VideoList';
import { VideoDetail } from '../VideoDetail';
import { FavouriteList } from '../FavouriteList';

const styles = {
  root: {
    padding: '25px 0',
  },
  paper: {
    height: '100%',
    width: '100%',
  }
};

class AppComponent extends Component {
  render() {
    const { classes, videoDetail } = this.props;

    return (
      <Grid className={classes.root}>
        <Container>
          <Paper className={classes.paper}>
            <SearchBar />
            {!videoDetail && <VideoList />}
            {videoDetail && (
              <VideoDetail
                videoDetail={videoDetail}
              />
            )}
            <FavouriteList />
          </Paper>
        </Container>
      </Grid>
    );
  }
}

export default withStyles(styles)(AppComponent);
