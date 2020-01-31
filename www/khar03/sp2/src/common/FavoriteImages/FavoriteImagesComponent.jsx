import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { showPhotoDetailAction } from '../../logic/actions';

class FavoriteImagesComponent extends Component {
  renderImage = (image) => {
    const { showPhotoDetail } = this.props;

    return (
      <GridListTile key={image.id} cols={1}>
        <img
          src={image.urls.small}
          alt={image.alt_description}
          style={{ height: 'auto', width: '100%' }}
        />
        <GridListTileBar
          title={image.alt_description}
          subtitle={<span>by: {image.user.name}</span>}
          actionIcon={
            <IconButton aria-label={`info about ${image.alt_description}`}>
              <InfoIcon
                style={{ color: '#fff' }}/>
            </IconButton>
          }
          onClick={() => (showPhotoDetail(image))}
        />
      </GridListTile>
    )};

  render() {
      const { favoriteImages } = this.props;
      if (favoriteImages && favoriteImages.length) {
          return (
              <Container>
                  <h1>You have {favoriteImages.length} favorite images</h1>
                  <GridList cols={3}>
                      {favoriteImages.map(image => this.renderImage(image))}
                  </GridList>
              </Container>
          );
      } else if (favoriteImages && favoriteImages.length === 0) {
          return (
              <Container>
                  <h1>You have no favorite images</h1>
              </Container>
          );
      }

      return <></>;
  }
}

const mapDispatchToProps = (dispatch) => {
  const showPhotoDetail = (photo) => {
    dispatch(showPhotoDetailAction(photo));
  };

  return {
    showPhotoDetail,
  }
};

export default connect(null, mapDispatchToProps)(FavoriteImagesComponent);
