import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, close, chilren }) => {
  return <div>{children}</div>;
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
