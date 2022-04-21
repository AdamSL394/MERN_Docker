import './App.css';
import React from 'react';
import { Card } from "./components/card"
import Navbar from './components/nav';
import LoginButton from './components/loginButton';
import LogOut from './components/logoutButton';
import { ThemeProvider, createTheme } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import Login from './views/login.js'


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
  const { isAuthenticated } = useAuth0();



  return (
    isAuthenticated ? (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar></Navbar>
          <Card></Card>
          <LogOut></LogOut>
        </div>
      </ThemeProvider>
    ) : (
      <div className="background">
        {/* <ThemeProvider theme={theme}> */}
          {/* <div className='container'> */}
            <Login></Login>
          {/* </div> */}
        {/* </ThemeProvider> */}
      </div >
    )
  )
}

export default App;
