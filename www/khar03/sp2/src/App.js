import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { initializeAppAction} from './logic/actions';
import { Container, CssBaseline, Grid, Paper } from '@material-ui/core';
import { SearchBar } from './common/SearchBar';
import { ImageList } from './common/ImageList';
import { ImageDetail } from './common/ImageDetail';
import FavoriteImagesComponent from './common/FavoriteImages/FavoriteImagesComponent';

class App extends Component {
    componentDidMount() {
      const { initializeApp } = this.props;
      initializeApp();
    }

  render() {
      const { detail, favoriteImages } = this.props;

        return (
          <div className="app">
              <CssBaseline />
              <Container>
                  <Grid>
                    <Paper>
                      <SearchBar />
                      {!detail && <ImageList />}
                      {detail && <ImageDetail image={detail} />}
                      {!detail && <FavoriteImagesComponent favoriteImages={favoriteImages.filter((image) => image.isFavorite)}/>}
                    </Paper>
                  </Grid>
              </Container>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
  detail: state.search.detail,
  favoriteImages: state.search.favoriteImages,
});

const mapDispatchToProps = (dispatch) => {
  const initializeApp = () => {
    dispatch(initializeAppAction());
  };

  return {
    initializeApp,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
