import React from 'react';
import PropTypes from 'prop-types';
import Stack from '../Layouts/Stack';
import styles from './Create.module.css';

const CreatePuzzle = ({ close }) => {
  return (
    <div className={styles.Container}>
      <Stack>Create</Stack>
      <button onClick={close} type="button">
        X
      </button>
    </div>
  );
};

CreatePuzzle.propTypes = {
  close: PropTypes.func.isRequired,
};
export default CreatePuzzle;
