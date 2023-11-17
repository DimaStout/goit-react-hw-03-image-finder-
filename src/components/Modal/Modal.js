import { BackdropStyled, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEvent);
  }

  handleEvent = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.props.modalToggle();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <BackdropStyled onClick={e => this.handleEvent(e)}>
        <ModalStyled>
          <img src={src} alt={alt} loading="lazy" />
        </ModalStyled>
      </BackdropStyled>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  modalToggle: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
