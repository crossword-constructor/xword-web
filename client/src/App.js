/* eslint-disable no-unused-vars */
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import styles from './App.module.css';
import Signup from './Signup/Signup';
import Workspace from './Workspace/Workspace';
import Calendar from './Calendar/Calendar';
import Navbar from './Navigation/Navbar';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Profile from './Profile/Profile';
import SolveSpace from './Workspace/SolveSpace';
import Construct from './Construct/Construct';
import './reset.css';
import theme from './Theme/default';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <Navbar />
        <Routes>
          <Route index element={<Signup />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="solve/:id" element={<SolveSpace />} />
          <Route path="construct" element={<Construct />} />
          <Route path="construct/:id" element={<Workspace />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
