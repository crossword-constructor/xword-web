import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInterval from '../Hooks/useInterval';
import styles from './Clock.module.css';
import Pause from '../Shared/Pause';

const formatTime = secNum => {
  let timeString = '';
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - hours * 3600) / 60);
  let seconds = secNum - hours * 3600 - minutes * 60;

  if (hours < 10 && hours > 0) {
    hours = `0${hours}:`;
    timeString += hours;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  timeString += `${minutes}:${seconds}`;
  return timeString;
};

const Clock = ({ time, pause, isPlaying }) => {
  const [currentTime, setCurrentTime] = useState(time);
  // Clock
  useInterval(
    () => {
      setCurrentTime(currentTime + 1);
    },
    isPlaying ? 1000 : null
  );

  return (
    <div className={styles.clock}>
      {formatTime(currentTime)}
      {isPlaying ? <Pause size={15} onClick={pause} /> : null}
    </div>
  );
};

Clock.propTypes = {
  time: PropTypes.number.isRequired,
  pause: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default Clock;
