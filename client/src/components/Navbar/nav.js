/* eslint-disable max-len */
import React from 'react';
import LogOut from '../LogoutButton/logoutButton.js';
import AppBar from '@mui/material/AppBar/AppBar.js';
import Toolbar from '@mui/material/Toolbar/Toolbar.js';
import IconButton from '@mui/material/IconButton/IconButton.js';
import MenuIcon from '@mui/icons-material/Menu.js';
import MenuItem from '@mui/material/MenuItem/MenuItem.js';
import Menu from '@mui/material/Menu/Menu.js';
import Box from '@mui/material/Box/Box.js';
import Typography from '@mui/material/Typography/Typography.js';
import './nav.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const pages = ['Home', 'View All Notes', 'User'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
          <div>
            <div className="menuIcon"></div>
            <div className="menuIcon"></div>
            <div className="menuIcon"></div>
          </div>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <span key={page} onClick={handleCloseNavMenu} style={{width:"13%"}}>
                <Typography textAlign="center" style={{cursor:"pointer"}} >{page}</Typography>
              </span>
            ))}
          </Menu>
        </Box>
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
