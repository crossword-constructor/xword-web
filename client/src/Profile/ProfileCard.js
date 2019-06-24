import React from 'react';
import PropTypes from 'prop-types';

import styles from './ProfileCard.module.css';
import testAvatar from './test.jpg';
// import testBackground from './testBackground.jpg';

const ProfileCard = ({ name, username, avatarImage, background }) => {
  console.log(avatarImage, background);
  return (
    <div className={styles.Container}>
      <div
        className={styles.Background}
        // src={testBackground}
        alt="profile background"
      />
      <div className={styles.Bottom}>
        <img className={styles.AvatarImage} src={testAvatar} alt="avatar" />
        <div className={styles.UserInfo}>
          <div className={styles.Name}>{name}</div>
          <div className={styles.Username}>{username}</div>
        </div>
        <div className={styles.Groups} />
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatarImage: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
};

export default ProfileCard;
