import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ImageDetail}from "../ImageDetail/";

class ImageListtComponent extends Component {
  renderImages = (images) => {
    return images.map((image) => {
      return (
        <ImageDetail image={image} />
      );
    })
  };

  render() {
    const { images } = this.props;
    if (images && images.length > 0) {
      return (
        <div>
          {this.renderImages(images)}
        </div>
      );
    }

    return <></>;
  }
}

const mapStateToProps = (state) => ({
  images: state.search.result,
});

export default connect(mapStateToProps, null)(ImageListtComponent);
