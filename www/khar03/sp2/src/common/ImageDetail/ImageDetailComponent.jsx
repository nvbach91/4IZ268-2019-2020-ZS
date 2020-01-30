import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showPhotoDetailAction, markAsFavoriteAction } from '../../logic/actions';
import './ImageDetail.scss';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import SaveIcon from '@material-ui/icons/Save';
import { Container, Button } from '@material-ui/core';

class ImageDetailComponent extends Component {
  getFavoriteIcon = (image) => {
      const { markAsFavorite } = this.props;
      if (image.isFavorite) {
          return (
              <FavoriteIcon
                  className="link favourite-link"
                  onClick={() => markAsFavorite(image)}
              />
          );
      }
      return (
          <FavoriteBorderIcon
              className="link favourite-link"
              onClick={() => markAsFavorite(image)}
          />
      );
  };

  render() {
    const { image, backToResults } = this.props;
    const headline = image.description || image.alt_description;

    return (
      <Container>
          <div className="detail">
              <div>
                  <ArrowBackIcon
                      className="link back-link"
                      onClick={backToResults}
                  />
                  <div className="action-links">
                      <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<SaveIcon />}
                          href={image.urls.raw}
                          target="_blank"
                      >
                        Save
                      </Button>
                      {this.getFavoriteIcon(image)}
                  </div>
              </div>
              <h1 className="headline">{headline}</h1>
              <img src={image.urls.regular} alt={image.alt_description} className="image" />
              <div>
                  <h2>{image.user.name}</h2>
                  {image.user.bio && (
                      <>
                          <p>{image.user.bio}</p>
                          <br />
                      </>
                  )}
                  {image.user.twitter_username && (
                      <p className="social-link">
                          <TwitterIcon />
                          <a target="_blank" href={`https://twitter.com/${image.user.twitter_username}`}>
                             {image.user.twitter_username}
                          </a>
                      </p>
                  )}
                  {image.user.instagram_username && (
                      <p className="social-link">
                          <InstagramIcon />
                          <a target="_blank" href={`https://instagram.com/${image.user.instagram_username}`}>
                              {image.user.instagram_username}
                          </a>
                      </p>
                  )}
              </div>
          </div>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    const backToResults = () => {
        dispatch(showPhotoDetailAction(null));
    };

    const markAsFavorite  = (image) => {
        dispatch(markAsFavoriteAction(image));
    };

    return {
        backToResults,
        markAsFavorite,
    };
};
export default connect(null, mapDispatchToProps)(ImageDetailComponent);
