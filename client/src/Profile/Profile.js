import React from 'react';
import Sidebar from '../Layouts/Sidebar';
import Stack from '../Layouts/Stack';
import PuzzleList from '../PuzzleList/PuzzleList';
import ProfileCard from './ProfileCard';

const solvedPuzzles = [
  { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfsaghkjh35498ghg' },
  {
    name: 'puzzle no 2',
    author: 'Gfsar McVeigh',
    id: 'gfjklgdfsg54534',
  },
  { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfsaghkjh35498ghg' },
  {
    name: 'puzzlfdsdfsdfsd fsdf ds fdsa e no 2',
    author: 'Gfsar McVeigfdgfdgdsfgh',
    id: 'g5fjkldsgfgfdfdsgdfsg54534',
  },
  { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfsaghkjh35498ghg' },
  {
    name: 'po 2',
    author: 'Gfsar McVeigh',
    id: 'gfjkldsfddfdgf5gfdfdsgdfsg54534',
  },
  { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfsaghkejh35498ghg' },
  {
    name: 'puzzle no 2',
    author: 'Gfsar McVeigh',
    id: 'gfjklgfddfsg54534',
  },
  { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfsaghkejh35498ghg' },
  {
    name: 'puzzlfdsdfsdfsd fsdf ds fdsa e no 2',
    author: 'Gfsar McVeigfdgfdgdsfgh',
    id: 'g5fjkldsgffdfgfdfdsgdfsg54534',
  },
  { name: 'puzzle no 1', author: 'Michael McVeigh', id: 'dfseaghkjh35498ghg' },
  {
    name: 'po 2',
    author: 'Gfsar MfdcVeigh',
    id: 'gfjkldsgf5fdfdfdsgdfsg54534',
  },
];

const constructedPuzzles = [
  {
    name: 'puzzle no 5y5fsar McVeigh',
    id: 'gfjkldsgfgfdsgfgfdsg54534',
  },
  {
    name: 'puzzle no 25',
    author: 'Gf54y654sar McVeigh',
    id: 'gfjkldsggdssfgfdsg54534',
  },
];

const Profile = () => {
  return (
    <Sidebar
      sideBar={
        <ProfileCard
          username="michael"
          name="Michael 👾 McVeigh"
          avatarImage="blah"
          background="blah"
        />
      }
      mainContent={
        <Stack>
          <PuzzleList title="Solved Puzzles" puzzles={solvedPuzzles} />
          <PuzzleList
            title="Constructed Puzzles"
            puzzles={constructedPuzzles}
          />
        </Stack>
      }
    />
  );
};

export default Profile;
