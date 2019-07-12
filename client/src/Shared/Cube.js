/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cube.module.css';

const Cube = ({ animate }) => {
  console.log(animate);
  return (
    <div className={styles.scene}>
      <div className={animate ? styles.animatedCube : styles.cube}>
        <img
          className={styles.front}
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NyIgaGVpZ2h0PSI5NyIgdmlld0JveD0iMCAwIDk3IDk3Ij48cGF0aCBmaWxsPSIjNzk3OTg3IiBkPSJNMi41IDIuNWg5MnY5MmgtOTJ6Ii8+PHBhdGggZD0iTTkyIDV2ODdINVY1aDg3bTUtNUgwdjk3aDk3VjB6Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTUgNWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3em0yMiAwaDIxdjIxSDQ5eiIvPjxwYXRoIGQ9Ik03MSA1aDIxdjIxSDcxeiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01IDI3aDIxdjIxSDV6Ii8+PHBhdGggZD0iTTI3IDI3aDIxdjIxSDI3eiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik00OSAyN2gyMXYyMUg0OXptMjIgMGgyMXYyMUg3MXpNNSA0OWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3eiIvPjxwYXRoIGQ9Ik00OSA0OWgyMXYyMUg0OXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNzEgNDloMjF2MjFINzF6Ii8+PHBhdGggZD0iTTUgNzFoMjF2MjFINXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjcgNzFoMjF2MjFIMjd6bTIyIDBoMjF2MjFINDl6bTIyIDBoMjF2MjFINzF6Ii8+PC9zdmc+"
          alt="cubeface"
        />
        <img
          className={styles.right}
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NyIgaGVpZ2h0PSI5NyIgdmlld0JveD0iMCAwIDk3IDk3Ij48cGF0aCBmaWxsPSIjNzk3OTg3IiBkPSJNMi41IDIuNWg5MnY5MmgtOTJ6Ii8+PHBhdGggZD0iTTkyIDV2ODdINVY1aDg3bTUtNUgwdjk3aDk3VjB6Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTUgNWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3em0yMiAwaDIxdjIxSDQ5eiIvPjxwYXRoIGQ9Ik03MSA1aDIxdjIxSDcxeiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01IDI3aDIxdjIxSDV6Ii8+PHBhdGggZD0iTTI3IDI3aDIxdjIxSDI3eiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik00OSAyN2gyMXYyMUg0OXptMjIgMGgyMXYyMUg3MXpNNSA0OWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3eiIvPjxwYXRoIGQ9Ik00OSA0OWgyMXYyMUg0OXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNzEgNDloMjF2MjFINzF6Ii8+PHBhdGggZD0iTTUgNzFoMjF2MjFINXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjcgNzFoMjF2MjFIMjd6bTIyIDBoMjF2MjFINDl6bTIyIDBoMjF2MjFINzF6Ii8+PC9zdmc+"
          alt="cubeface"
        />
        <img
          className={styles.back}
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NyIgaGVpZ2h0PSI5NyIgdmlld0JveD0iMCAwIDk3IDk3Ij48cGF0aCBmaWxsPSIjNzk3OTg3IiBkPSJNMi41IDIuNWg5MnY5MmgtOTJ6Ii8+PHBhdGggZD0iTTkyIDV2ODdINVY1aDg3bTUtNUgwdjk3aDk3VjB6Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTUgNWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3em0yMiAwaDIxdjIxSDQ5eiIvPjxwYXRoIGQ9Ik03MSA1aDIxdjIxSDcxeiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01IDI3aDIxdjIxSDV6Ii8+PHBhdGggZD0iTTI3IDI3aDIxdjIxSDI3eiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik00OSAyN2gyMXYyMUg0OXptMjIgMGgyMXYyMUg3MXpNNSA0OWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3eiIvPjxwYXRoIGQ9Ik00OSA0OWgyMXYyMUg0OXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNzEgNDloMjF2MjFINzF6Ii8+PHBhdGggZD0iTTUgNzFoMjF2MjFINXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjcgNzFoMjF2MjFIMjd6bTIyIDBoMjF2MjFINDl6bTIyIDBoMjF2MjFINzF6Ii8+PC9zdmc+"
          alt="cubeface"
        />
        <img
          className={styles.left}
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NyIgaGVpZ2h0PSI5NyIgdmlld0JveD0iMCAwIDk3IDk3Ij48cGF0aCBmaWxsPSIjNzk3OTg3IiBkPSJNMi41IDIuNWg5MnY5MmgtOTJ6Ii8+PHBhdGggZD0iTTkyIDV2ODdINVY1aDg3bTUtNUgwdjk3aDk3VjB6Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTUgNWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3em0yMiAwaDIxdjIxSDQ5eiIvPjxwYXRoIGQ9Ik03MSA1aDIxdjIxSDcxeiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01IDI3aDIxdjIxSDV6Ii8+PHBhdGggZD0iTTI3IDI3aDIxdjIxSDI3eiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik00OSAyN2gyMXYyMUg0OXptMjIgMGgyMXYyMUg3MXpNNSA0OWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3eiIvPjxwYXRoIGQ9Ik00OSA0OWgyMXYyMUg0OXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNzEgNDloMjF2MjFINzF6Ii8+PHBhdGggZD0iTTUgNzFoMjF2MjFINXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjcgNzFoMjF2MjFIMjd6bTIyIDBoMjF2MjFINDl6bTIyIDBoMjF2MjFINzF6Ii8+PC9zdmc+"
          alt="cubeface"
        />
        <img
          className={styles.top}
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NyIgaGVpZ2h0PSI5NyIgdmlld0JveD0iMCAwIDk3IDk3Ij48cGF0aCBmaWxsPSIjNzk3OTg3IiBkPSJNMi41IDIuNWg5MnY5MmgtOTJ6Ii8+PHBhdGggZD0iTTkyIDV2ODdINVY1aDg3bTUtNUgwdjk3aDk3VjB6Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTUgNWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3em0yMiAwaDIxdjIxSDQ5eiIvPjxwYXRoIGQ9Ik03MSA1aDIxdjIxSDcxeiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01IDI3aDIxdjIxSDV6Ii8+PHBhdGggZD0iTTI3IDI3aDIxdjIxSDI3eiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik00OSAyN2gyMXYyMUg0OXptMjIgMGgyMXYyMUg3MXpNNSA0OWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3eiIvPjxwYXRoIGQ9Ik00OSA0OWgyMXYyMUg0OXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNzEgNDloMjF2MjFINzF6Ii8+PHBhdGggZD0iTTUgNzFoMjF2MjFINXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjcgNzFoMjF2MjFIMjd6bTIyIDBoMjF2MjFINDl6bTIyIDBoMjF2MjFINzF6Ii8+PC9zdmc+"
          alt="cubeface"
        />
        <img
          className={styles.bottom}
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NyIgaGVpZ2h0PSI5NyIgdmlld0JveD0iMCAwIDk3IDk3Ij48cGF0aCBmaWxsPSIjNzk3OTg3IiBkPSJNMi41IDIuNWg5MnY5MmgtOTJ6Ii8+PHBhdGggZD0iTTkyIDV2ODdINVY1aDg3bTUtNUgwdjk3aDk3VjB6Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTUgNWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3em0yMiAwaDIxdjIxSDQ5eiIvPjxwYXRoIGQ9Ik03MSA1aDIxdjIxSDcxeiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01IDI3aDIxdjIxSDV6Ii8+PHBhdGggZD0iTTI3IDI3aDIxdjIxSDI3eiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik00OSAyN2gyMXYyMUg0OXptMjIgMGgyMXYyMUg3MXpNNSA0OWgyMXYyMUg1em0yMiAwaDIxdjIxSDI3eiIvPjxwYXRoIGQ9Ik00OSA0OWgyMXYyMUg0OXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNzEgNDloMjF2MjFINzF6Ii8+PHBhdGggZD0iTTUgNzFoMjF2MjFINXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjcgNzFoMjF2MjFIMjd6bTIyIDBoMjF2MjFINDl6bTIyIDBoMjF2MjFINzF6Ii8+PC9zdmc+"
          alt="cubeface"
        />
      </div>
    </div>
  );
};

Cube.propTypes = {
  animate: PropTypes.bool.isRequired,
};

export default Cube;
