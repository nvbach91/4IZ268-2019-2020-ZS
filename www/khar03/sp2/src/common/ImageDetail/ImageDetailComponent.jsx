import React, {Component} from 'react';

class ImageDetailComponent extends Component {
  render() {
    const { image } = this.props;
    return (
      <div>
        <img src={image.urls.regular} alt={image.alt_description} />
        {image.id}
      </div>
    );
  }
}

export default ImageDetailComponent;
