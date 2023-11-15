import { ImageGalleryItemStyled } from './ImageGalleryItem.styled';
import { Component } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  modalToggle = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.img;
    const { showModal } = this.state;

    return (
      <ImageGalleryItemStyled>
        <img
          src={webformatURL}
          alt={tags}
          loading="lazy"
          onClick={this.modalToggle}
        />
        {showModal && (
          <Modal
            src={largeImageURL}
            alt={tags}
            modalToggle={this.modalToggle}
          />
        )}
      </ImageGalleryItemStyled>
    );
  }
}

ImageGalleryItem.propTypes = {
  img: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
