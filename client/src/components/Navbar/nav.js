/* eslint-disable max-len */
import React from 'react';
import LogOut from '../LogoutButton/logoutButton.js';
import AppBar from '@mui/material/AppBar/index.js';
import Toolbar from '@mui/material/Toolbar/index.js';
import IconButton from '@mui/material/IconButton/index.js';
import MenuIcon from '@mui/icons-material/Menu.js';
import './nav.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
  const { user } = useAuth0();
  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }
  const routeChanges = () => {
    const path = `/all`;
    navigate(path);
  };
  const upload = () => {
    const path = `/upload`;
    navigate(path);
  };
  const userSettings = () => {
    const path = `/userSettings`;
    navigate(path);
  };
  return (
    <AppBar position="static" className="xl12 l12 m12 s12 xs12" id="navbar">
      <Toolbar>
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2 }}
          >

        </IconButton>
        <span className="tabs" id="home" onClick={handleClick}>
          {' '}
          Home \
        </span>
        <span className="tabs" id="all" onClick={routeChanges}>
          {' '}
          View All Notes \
        </span>
        {/* <span className="tabs" id="all" onClick={upload} > Upload Notes \</span> */}
        <i className="tabs" id="userName" onClick={userSettings}>
          {' '}
          <i
            className="userInfo"
            style={{
              fontFamily:
                'font-family:Times, Times New Roman, serif !important',
            }}
          >
            Hi{' '}
            <span role="img" aria-label="Star">
              👋🏼 &nbsp;
            </span>{' '}
            {user.name ? user.name : ''}
          </i>{' '}
        </i>
        <img
          id="userInfo"
          style={{ height: '25px', width: '25px' }}
          src={user.picture}
          referrerPolicy="no-referrer"
          alt="User Profile"
        ></img>
        <LogOut></LogOut>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
