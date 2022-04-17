import './App.css';
import React from 'react';
import { Card } from "./components/card"
import Navbar from './components/nav';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { makeStyles, ThemeProvider, createTheme } from '@mui/material'


let theme = createTheme({
  palette: {
    primary: {
      main: "#e9d8c2",
    },
    secondary: {
      main: "#f8d6c5",
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <Container maxWidth="lrg"> */}
        <Navbar ></Navbar>
       <Card></Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
