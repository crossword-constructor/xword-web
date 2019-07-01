import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ isOpen, close, children }) => {
  return (
    <>
      <div className={isOpen ? styles.background : styles.hiddenBackground} />
      <div className={isOpen ? styles.modal : styles.hiddenModal}>
        <div
          data-testid="close-modal"
          className={styles.close}
          onClick={close}
          onKeyPress={close}
          tabIndex="-2"
          role="button"
        >
          <i className="fas fa-times" />
        </div>
        {children}
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
