import React, {Component} from 'react';
import { sortResultsAction, showPhotoDetailAction, markAsFavoriteAction } from '../../logic/actions';
import { connect } from 'react-redux';
import './ImageList.scss';
import { GridList, GridListTile, GridListTileBar, IconButton, Container, Divider } from '@material-ui/core';
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

class ImageListComponent extends Component {
  getFavoriteIcon = (image) => {
    const { markAsFavorite } = this.props;
    if (image.isFavorite) {
      return (
        <FavoriteIcon
          onClick={() => markAsFavorite(image)}
          style={{ color: '#ff0000' }}
        />
      );
    }
    return (
      <FavoriteBorderIcon
        onClick={() => markAsFavorite(image)}
        style={{ color: '#fff' }}
      />
    );
  };

  renderImage = (image) => {
    const { showPhotoDetail } = this.props;

    return (
      <GridListTile key={image.id} cols={1}>
        <img onClick={() => (showPhotoDetail(image))}
          src={image.urls.small}
          alt={image.alt_description}
          style={{ height: 'auto', width: '100%' }}
        />
        <GridListTileBar
          title={image.alt_description}
          subtitle={<span>by: {image.user.name}</span>}
          actionIcon={
            <IconButton aria-label={`info about ${image.alt_description}`}>
              {this.getFavoriteIcon(image)}
            </IconButton>
          }

        />
      </GridListTile>
    )};

  render() {
    const { images, sortResults, term } = this.props;
    if (images && images.length > 0) {
      return (
        <Container>
          <div className="sort-panel">
            Sort by
            &nbsp;<span className="sort-link" onClick={() => sortResults("most")}>the most</span>,
            &nbsp;<span className="sort-link" onClick={() => sortResults("least")}>the least</span>
            &nbsp;likes.
          </div>
          <Divider />
          <GridList cols={3}>
            {images.map(image => this.renderImage(image))}
          </GridList>
        </Container>
      );
    } else if (images && images.length === 0) {
      return (
        <h1>{term && `No results found for term ${term}`}</h1>
      );
    }

    return <></>;
  }
}

const mapStateToProps = (state) => ({
  images: state.search.result,
  term: state.search.term,
});

const mapDispatchToProps = (dispatch) => {
  const sortResults = (direction) => {
    dispatch(sortResultsAction(direction));
  };

  const showPhotoDetail = (photo) => {
    dispatch(showPhotoDetailAction(photo));
  };
  const markAsFavorite = (image) => {
    dispatch(markAsFavoriteAction(image));
  };

  return {
    sortResults,
    showPhotoDetail,
    markAsFavorite,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageListComponent);
