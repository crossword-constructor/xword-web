import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Sidebar from '../Layouts/Sidebar';
import Stack from '../Layouts/Stack';
import SolvedPuzzlePreview from './SolvedPuzzlePreview';
// import ConstructedPreview from '../ConstructedPreview/ConstructedPreview';
import ProfileCard from './ProfileCard';
import styles from './Profile.module.css';

const GET_PROFILE = gql`
  {
    profileInfo {
      success
      message
      user {
        _id
        name
        username
        solvedPuzzles {
          _id
          board
          updatedAt
          puzzle {
            _id
            date
          }
        }
        solvedPuzzleStats {
          total
          solved
          revealed
        }
      }
    }
  }
`;

const Profile = () => {
  return (
    <Query query={GET_PROFILE}>
      {({ error, loading, data, fetchMore }) => {
        if (loading) return <div>loading</div>;
        if (error) return <div>error</div>;
        if (data && data.profileInfo) {
          const {
            profileInfo: { user, success, message },
          } = data;
          if (!success && message) {
            /** @todo consider how to handle...this should never happen...we only get redirected here if we have a user */
            return <div>error</div>;
          }
          const { name, username, solvedPuzzles, solvedPuzzleStats } = user;
          return (
            <div className={styles.Page}>
              <Sidebar
                sideBar={
                  <>
                    <ProfileCard
                      username={username}
                      name={name}
                      avatarImage="blah"
                      background="blah"
                    />
                    <div>feed</div>
                  </>
                }
                mainContent={
                  <Stack>
                    {solvedPuzzles ? (
                      <div className={styles.container}>
                        <SolvedPuzzlePreview
                          puzzles={solvedPuzzles}
                          stats={solvedPuzzleStats}
                          fetchMore={fetchMore}
                        />
                      </div>
                    ) : null}
                  </Stack>
                }
              />
            </div>
          );
        }
        return 'something went wrong';
      }}
    </Query>
  );
};

export default Profile;
