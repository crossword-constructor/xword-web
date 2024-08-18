/* eslint-disable no-unused-vars */
import React from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';
import { TODAYS_PUZZLE } from '../Utils/queries';
import PuzzleIcon from '../Shared/PuzzleIcon';
import styles from './PuzzleOfTheDay.module.css';

const PuzzleOfTheDay = () => {
  // get todays date
  // fetchPuzzle
  // display
  const date = getDateString();

  return <div className={styles.container} />;
};

const getDateString = () => {
  const today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1); // January is 0!
  const yyyy = today.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

export default PuzzleOfTheDay;
