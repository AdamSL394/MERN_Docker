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
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return<img id="loading" src="https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bihnamtzyz8vki1lhaho1d71gyhbf1cg4ay7wurdj&rid=200w.gif&ct=g" alt="Loading Gif"/>

  }

  return (
    isAuthenticated ? (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar></Navbar>
          <Card></Card>
        </div>
      </ThemeProvider>
    ) : (
      <>
        <div className='appBubble'>
          <span className="icon">
            NS
          </span>
        </div>
        <LoginButton></LoginButton>
        <Login></Login>
      </>
    )
  )
}

export default App;
