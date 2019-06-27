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
      _id
      name
      username
      solvedPuzzles {
        _id
        puzzle {
          _id
          date
        }
        board
      }
    }
  }
`;

const Profile = () => {
  return (
    <Query query={GET_PROFILE} fetchPolicy="network-only">
      {({ error, loading, data }) => {
        if (loading) return <div>loading</div>;
        if (error) return <div>error</div>;
        if (data.profileInfo) {
          return (
            <div className={styles.Page}>
              <Sidebar
                sideBar={
                  <>
                    <ProfileCard
                      username={data.profileInfo.username}
                      name={data.profileInfo.name}
                      avatarImage="blah"
                      background="blah"
                    />
                    <div>feed</div>
                  </>
                }
                mainContent={
                  <Stack>
                    {/* <ConstructedPreview /> */}
                    <div className={styles.Container}>
                      <SolvedPuzzlePreview
                        className={styles.Container}
                        puzzles={data.profileInfo.solvedPuzzles}
                      />
                    </div>
                    {/* <PuzzleList
                      title="Constructed Puzzles"
                      puzzles={constructedPuzzles}
                    /> */}
                  </Stack>
                }
              />
            </div>
          );
        }
      }}
    </Query>
  );
};

export default Profile;
