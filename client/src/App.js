/* eslint-disable no-unused-vars */
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from 'react-router-dom';

import styles from './App.module.css';
import Signup from './Signup/Signup';
import Workspace from './Workspace/Workspace';
import Calendar from './Calendar/Calendar';
import Navbar from './Navigation/Navbar';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Profile from './Profile/Profile';
import SolveSpace from './Workspace/SolveSpace';
import './reset.css';

const App = () => {
  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Navbar />}> */}
        <Route index element={<Signup />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="solve:id" element={<SolveSpace />} />
        {/* </Route> */}
      </Routes>
      {/* <RouterProvider router={router}>
        <Navbar />
      </RouterProvider> */}
    </div>
    //     );
    //   }}
    // </Query>
  );
};

export default App;
