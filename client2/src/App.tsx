import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import { Calendar } from './Calendar/Calendar';
import { Navbar } from './Navbar/Navbar';
import { Page } from './Common/Atoms';
import { defaultTheme } from './Theme/theme';
import './App.css';
import { SolveSpace } from './SolveSpace/SolveSpace';
import { Workspace } from './Construct/Workspace';
import { Login } from './Login/Login';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Page>
        <Routes>
          <Route path="calendar" element={<Calendar />} />
          <Route path="solve/:id" element={<SolveSpace />} />
          <Route path="construct" element={<Workspace />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Page>
    </ThemeProvider>
  );
}

export default App;
