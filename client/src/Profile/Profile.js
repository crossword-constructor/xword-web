import React from 'react';
import { Query } from 'react-apollo';
import { GET_PROFILE, SOLVED_PUZZLES } from '../utils/queries';
import Sidebar from '../Layouts/Sidebar';
import Stack from '../Layouts/Stack';
import SolvedPuzzlePreview from './SolvedPuzzlePreview';
import DataScroller from './DataScroller';
import PuzzleOfTheDay from './PuzzleOfTheDay';
// import ConstructedPreview from '../ConstructedPreview/ConstructedPreview';
import ProfileCard from './ProfileCard';
import styles from './Profile.module.css';

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
                    <>
                      <div className={styles.container}>
                        <h2 className={styles.containerTitle}>
                          Puzzle of the Day
                        </h2>
                        <PuzzleOfTheDay />
                      </div>
                      <div className={styles.container}>
                        <h2 className={styles.containerTitle}>
                          Solved Puzzles
                        </h2>
                        <SolvedPuzzlePreview
                          stats={solvedPuzzleStats}
                          DataScroller={
                            <DataScroller
                              data={solvedPuzzles}
                              fetchMore={() =>
                                fetchMore({
                                  query: SOLVED_PUZZLES,
                                  variables: {
                                    cursor:
                                      solvedPuzzles[solvedPuzzles.length - 1]
                                        .updatedAt,
                                  },
                                  updateQuery: (
                                    previousResult,
                                    { fetchMoreResult }
                                  ) => {
                                    return {
                                      profileInfo: {
                                        ...previousResult.profileInfo,
                                        user: {
                                          ...previousResult.profileInfo.user,
                                          solvedPuzzles: [
                                            ...previousResult.profileInfo.user
                                              .solvedPuzzles,
                                            ...fetchMoreResult.getSolvedPuzzles
                                              .solvedPuzzles,
                                          ],
                                        },
                                      },
                                    };
                                  },
                                })
                              }
                              dataLength={solvedPuzzleStats.total}
                            />
                          }
                        />
                      </div>
                    </>
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
