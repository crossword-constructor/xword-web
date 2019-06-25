import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Sidebar from '../Layouts/Sidebar';
import Stack from '../Layouts/Stack';
import SolvedPuzzlePreview from './SolvedPuzzlePreview';
import ConstructedPreview from '../ConstructedPreview/ConstructedPreview';
import ProfileCard from './ProfileCard';

// const solvedPuzzles = [
//   { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfsaghkjh35498ghg' },
//   {
//     name: 'puzzle no 2',
//     author: 'Gfsar McVeigh',
//     id: 'gfjklgdfsg54534',
//   },
//   { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfsaghkjh35498ghg' },
//   {
//     name: 'puzzlfdsdfsdfsd fsdf ds fdsa e no 2',
//     author: 'Gfsar McVeigfdgfdgdsfgh',
//     id: 'g5fjkldsgfgfdfdsgdfsg54534',
//   },
//   { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfsaghkjh35498ghg' },
//   {
//     name: 'po 2',
//     author: 'Gfsar McVeigh',
//     id: 'gfjkldsfddfdgf5gfdfdsgdfsg54534',
//   },
//   { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfsaghkejh35498ghg' },
//   {
//     name: 'puzzle no 2',
//     author: 'Gfsar McVeigh',
//     id: 'gfjklgfddfsg54534',
//   },
//   { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfsaghkejh35498ghg' },
//   {
//     name: 'puzzlfdsdfsdfsd fsdf ds fdsa e no 2',
//     author: 'Gfsar McVeigfdgfdgdsfgh',
//     id: 'g5fjkldsgffdfgfdfdsgdfsg54534',
//   },
//   { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfseaghkjh35498ghg' },
//   {
//     name: 'po 2',
//     author: 'Gfsar MfdcVeigh',
//     id: 'gfjkldsgf5fdfdfdsgdfsg54534',
//   },
// ];

// const constructedPuzzles = [
//   {
//     name: 'puzzle no 5y5fsar McVeigh',
//     id: 'gfjkldsgfgfdsgfgfdsg54534',
//   },
//   {
//     name: 'puzzle no 25',
//     author: 'Gf54y654sar McVeigh',
//     id: 'gfjkldsggdssfgfdsg54534',
//   },
// ];

const GET_PROFILE = gql`
  {
    profileInfo {
      _id
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
    <Query query={GET_PROFILE}>
      {({ error, loading, data }) => {
        if (loading) return <div>loading</div>;
        if (error) return <div>error</div>;
        if (data.profileInfo) {
          return (
            <Sidebar
              sideBar={
                <>
                  <ProfileCard
                    username="michael"
                    name="Michael 👾 McVeigh"
                    avatarImage="blah"
                    background="blah"
                  />
                  <div>feed</div>
                </>
              }
              mainContent={
                <Stack>
                  <ConstructedPreview />
                  <SolvedPuzzlePreview
                    puzzles={data.profileInfo.solvedPuzzles}
                  />
                  {/* <PuzzleList
                    title="Constructed Puzzles"
                    puzzles={constructedPuzzles}
                  /> */}
                </Stack>
              }
            />
          );
        }
      }}
    </Query>
  );
};

export default Profile;
