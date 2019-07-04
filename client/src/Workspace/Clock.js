import React from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import useInterval from '../Hooks/useInterval';
import styles from './Clock.module.css';
import Pause from '../Shared/Pause';

const UPDATE_TIME = gql`
  mutation updateUserPuzzle($_id: ID!, $time: Float!) {
    updateUserPuzzle(_id: $_id, time: $time) {
      _id
      time
    }
  }
`;
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

const Clock = ({ time, pause, isPlaying, userPuzzleId, client }) => {
  // Clock
  useInterval(
    () => {
      client.mutate({
        mutation: UPDATE_TIME,
        variables: { _id: userPuzzleId, time: time + 1 },
        networkPolicy: 'cache-only',
      });
      // setCurrentTime(currentTime + 1);
    },
    isPlaying ? 1000 : null
  );

  return (
    <div className={styles.clock}>
      {formatTime(time)}
      {isPlaying ? <Pause size={15} onClick={pause} /> : null}
    </div>
  );
};

Clock.propTypes = {
  time: PropTypes.number.isRequired,
  pause: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  userPuzzleId: PropTypes.string.isRequired,
  client: PropTypes.shape({ mutate: PropTypes.func }).isRequired,
};

export default withApollo(Clock);
